import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'


import { User } from './user.model'
import { environment } from 'src/environments/environment'
export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer:any
  constructor (private http: HttpClient, private router: Router) {}
  signup (email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        })
      )
  }
  login (email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        })
      )
  }
  private handleAuth (
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expiresInDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expiresInDate)
    this.user.next(user)
    this.autoLogout(expiresIn*1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }
  logout () {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }
  private handleError (errorResponse: HttpErrorResponse) {
    // this.error = 'AN ERROR OCCURED'
    let errorMessage = 'An unknown error occured!'
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage)
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use!'
        break
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project!'
        break
      case 'INVALID_EMAIL':
        errorMessage = 'Please enter a valid email'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'user not found!'
        break
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password!'
        break
      case 'USER_DISABLED':
        errorMessage = 'User has been disabled'
        break
      default:
        errorMessage = errorResponse.error.error.message
    }
    return throwError(errorMessage)
  }
  autoLogin () {
    const userData: {
      email: string;
      userId: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.userId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )
    if (loadedUser.token) {
      this.user.next(loadedUser)
      const expDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime()
      this.autoLogout(expDuration)
    }
  }
  autoLogout (expirationDuration: number) {
    this.tokenExpirationTimer=
    setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }
}

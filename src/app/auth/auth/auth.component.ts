import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AuthResponseData, AuthService } from '../auth.service'
import { AlertComponent } from '../../shared/alert/alert.component'
import { PlaceHolderDirective } from '../../shared/placeholder.directive'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  constructor (
    private authService: AuthService,
    private router: Router,
    private componentFactoryRes: ComponentFactoryResolver
  ) {}
  isLoginMode = true
  error: string = null
  isLoading = false
  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost: PlaceHolderDirective
  private closeSub: Subscription

  onSwitchMode () {
    this.isLoginMode = !this.isLoginMode
  }
  onSubmit (form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email
    const password = form.value.password
    let authObs: Observable<AuthResponseData>
    this.isLoading = true

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }
    authObs.subscribe(
      respo => {
        this.error = null
        this.router.navigate(['/recipes'])
        this.isLoading = false
      },
      errorMessage => {
        this.error = errorMessage
        this.isLoading = false
        console.log(errorMessage)
        this.showErrorAlert(errorMessage)
      }
    )
    form.reset()
  }
  closeError () {
    this.error = null
  }
  private showErrorAlert (message: string) {
    const alertCompFactory =
      this.componentFactoryRes.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()
    const componentRef = hostViewContainerRef.createComponent(alertCompFactory)
    componentRef.instance.message = message
   this.closeSub =  componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      // this.alertHost.viewContainerRef.clear()
      hostViewContainerRef.clear()
    })
  }
  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe()
    }
  }
}

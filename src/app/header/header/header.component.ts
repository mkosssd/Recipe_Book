import { Component, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { DataService } from '../../shared/data.service'
import { AuthService } from '../../auth/auth.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isNavbarOpen = false;
  collapsed  = true
  private userSub: Subscription
  isAuthenicated: boolean = false
  constructor (private data: DataService, private auth: AuthService) {}
  ngOnInit (): void {
    // this.fetchData()
    this.userSub = this.auth.user.subscribe(user => {
      this.isAuthenicated = !!user
    })
  }
  saveData () {
    this.data.storeRecipe()
  }
  fetchData () {
    this.data.fetchRecipe().subscribe()
  }
  ngOnDestroy (): void {
    this.userSub.unsubscribe()
  }
  onLogout(){
    this.auth.logout()
  }

  // Toggle the collapse state
  
  
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}

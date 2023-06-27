import { Component, OnInit } from '@angular/core'
import { AuthService } from './auth/auth.service'
import { DataService } from './shared/data.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Recipe Book'
  constructor (private auth: AuthService, private data: DataService) {}
  ngOnInit (): void {
    this.auth.autoLogin()
    setTimeout(()=>{

      this.data.fetchRecipe().subscribe()
    },10)

  }
}
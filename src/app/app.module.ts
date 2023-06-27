import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    ,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

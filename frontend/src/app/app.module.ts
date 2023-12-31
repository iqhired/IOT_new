import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    HomeComponent
  ],

  imports: [
   BrowserModule,
   AppRoutingModule,
   HttpClientModule,
   AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

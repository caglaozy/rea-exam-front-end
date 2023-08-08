import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './services/auth/auth.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InfoComponent } from './info/info.component';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { TweetComponent } from './tweet/tweet.component';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HomeComponent,
    InfoComponent,
    DashboardHomeComponent,
    TweetComponent,

 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    RouterModule, // RouterModule'u imports'a ekleyin
SidebarModule
  ],
  providers: [
    AuthService,
    MessageService,
    ConfirmationService,
   
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

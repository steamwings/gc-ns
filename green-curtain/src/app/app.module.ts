import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@src/app/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/components/home/home.component';
import { WelcomeComponent } from '@src/app/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import { AuthService } from '@src/app/services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

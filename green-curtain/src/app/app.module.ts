import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@src/app/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { StorageService } from '@src/app/shared/services/storage.service';
import { UserService } from '@src/app/shared/services/user.service';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';
import { ApiService } from '@src/app/shared/services/api.service';

import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { WelcomeComponent } from '@src/app/shared/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/shared/components/login/login.component';
import { NavComponent } from '@src/app/shared/components/nav/nav.component';
import { ProfileComponent } from '@src/app/profile/profile.component';
import { SearchComponent } from '@src/app/search/search.component';
import { OrgsComponent } from '@src/app/orgs/orgs.component';
import { ReviewComponent } from '@src/app/shared/components/review/review.component';

/**
 * AppModule for web
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
    NavComponent,
    ProfileComponent,
    SearchComponent,
    OrgsComponent,
    ReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    ApiService,
    { provide: StorageService, useClass: LocalStorageService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

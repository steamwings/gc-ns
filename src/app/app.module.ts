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
import { WelcomeComponent } from '@src/app/shared/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/shared/components/login/login.component';
import { NavComponent } from '@src/app/shared/components/nav/nav.component';
import { ProfileComponent } from '@src/app/profile/profile.component';
import { SearchComponent } from '@src/app/search/search.component';
import { OrgsComponent } from '@src/app/orgs/orgs.component';
import { ReviewComponent } from '@src/app/shared/components/review/review.component';
import { SettingsComponent } from '@src/app/shared/components/settings/settings.component';
import { httpInterceptorProviders } from 'src/app/shared/http-interceptors';
import { PageNotFoundComponent } from '@src/app/shared/components/page-not-found/page-not-found.component';
import { FooterComponent } from '@src/app/shared/components/footer/footer.component';
import { AccountDetailsComponent } from '@src/app/shared/components/account-details/account-details.component';

import { MyLetDirective } from '@src/app/shared/directives/my-let.directive';

/**
 * AppModule for web
 */
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    NavComponent,
    ProfileComponent,
    SearchComponent,
    OrgsComponent,
    ReviewComponent,
    SettingsComponent,
    PageNotFoundComponent,
    MyLetDirective,
    FooterComponent,
    AccountDetailsComponent,
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
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
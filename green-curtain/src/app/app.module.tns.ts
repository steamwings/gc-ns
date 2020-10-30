import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular/nativescript.module';
import { NativeScriptHttpClientModule } from '@nativescript/angular/http-client';
import { NativeScriptFormsModule } from '@nativescript/angular/forms';
import { AppRoutingModule } from '@src/app/app-routing.module';

import { registerElement } from 'nativescript-angular';
registerElement('PreviousNextView', () => require('nativescript-iqkeyboardmanager').PreviousNextView);

import { HideActionBarDirective } from '@src/app/shared/directives/hide-action-bar.directive';
import { ClearNavHistoryDirective } from '@src/app/shared/directives/clear-nav-history.directive';
import { MyLetDirective } from '@src/app/shared/directives/my-let.directive';

import { UserService } from '@src/app/shared/services/user.service';
import { ApiService } from '@src/app/shared/services/api.service';
import { UserStorageService } from '@src/app/shared/services/user-storage.service';
import { StorageService } from '@src/app/shared/services/storage.service';
import { httpInterceptorProviders } from '@src/app/shared/http-interceptors/index';
import { KeyValueStorage } from '@src/app/shared/services/key-value-storage';

import { AppComponent } from '@src/app/app.component';
import { WelcomeComponent } from '@src/app/shared/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/shared/components/login/login.component';
import { ProfileComponent } from '@src/app/profile/profile.component';
import { HomeComponent } from '@src/app/home/home.component';
import { SearchComponent } from '@src/app/search/search.component';
import { OrgsComponent } from '@src/app/orgs/orgs.component';
import { ReviewComponent } from '@src/app/shared/components/review/review.component';
import { SettingsComponent } from '@src/app/shared/components/settings/settings.component';
import { PageNotFoundComponent } from '@src/app/shared/components/page-not-found/page-not-found.component';
import { AccountDetailsComponent } from '@src/app/shared/components/account-details/account-details.component';

/**
 * AppModule for mobile
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
    ProfileComponent,
    HideActionBarDirective,
    ClearNavHistoryDirective,
    MyLetDirective,
    SearchComponent,
    OrgsComponent,
    ReviewComponent,
    SettingsComponent,
    PageNotFoundComponent,
    AccountDetailsComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
  ],
  entryComponents: [],
  providers: [
    UserService,
    ApiService,
    { provide: KeyValueStorage, useClass: StorageService },
    UserStorageService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

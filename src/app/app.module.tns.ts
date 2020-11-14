import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptFormsModule, NativeScriptHttpClientModule, registerElement } from '@nativescript/angular';

registerElement('PreviousNextView', () => require('@nativescript/iqkeyboardmanager').PreviousNextView);

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppPlatformModule } from './modules/app-platform.module';

import { httpInterceptorProviders } from '@src/app/shared/http-interceptors/index';

import { HideActionBarDirective } from '@src/app/shared/directives/hide-action-bar.directive';
import { ClearNavHistoryDirective } from '@src/app/shared/directives/clear-nav-history.directive';
import { MyLetDirective } from '@src/app/shared/directives/my-let.directive';

import { UserService } from '@src/app/shared/services/user.service';
import { ApiService } from '@src/app/shared/services/api.service';
import { StorageService } from '@src/app/shared/services/storage.service';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';

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
import { RouterExtensions } from '@src/app/modules/app-platform.module';
import { MobileActionBarComponent } from '@src/app/shared/components/mobile-action-bar/mobile-action-bar.component.tns';

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
    MobileActionBarComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
    AppPlatformModule
  ],
  providers: [
    UserService,
    ApiService,
    { provide: StorageService, useClass: LocalStorageService },
    httpInterceptorProviders,
    RouterExtensions
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppProfileModule } from '@src/app/profile/profile.module';
import { AppSharedModule } from '@src/app/shared/shared.module';

import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { SearchComponent } from '@src/app/search/search.component';
import { OrgsComponent } from '@src/app/orgs/orgs.component';
import { WelcomeComponent } from '@src/app/shared/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/shared/components/login/login.component';
import { ReviewComponent } from '@src/app/shared/components/review/review.component';
import { SettingsComponent } from '@src/app/shared/components/settings/settings.component';
import { PageNotFoundComponent } from '@src/app/shared/components/page-not-found/page-not-found.component';
import { AccountDetailsComponent } from '@src/app/shared/components/account-details/account-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    OrgsComponent,
    WelcomeComponent,
    LoginComponent,
    ReviewComponent,
    SettingsComponent,
    PageNotFoundComponent,
    AccountDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    AppSharedModule,
    AppProfileModule
  ],
  providers: [ ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

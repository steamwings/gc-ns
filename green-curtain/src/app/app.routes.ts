import { Routes } from '@angular/router';

import { WelcomeComponent } from '@src/app/shared/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/shared/components/login/login.component';
import { WelcomeGuard } from '@src/app/shared/guards/welcome.guard';
import { ReviewComponent } from '@src/app/shared/components/review/review.component';
import { SettingsComponent } from '@src/app/shared/components/settings/settings.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';

// These routes are shared between mobile and web
export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [WelcomeGuard] },
  { path: 'review', component: ReviewComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent }
];

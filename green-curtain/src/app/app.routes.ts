import { Routes } from '@angular/router';

import { WelcomeComponent } from '@src/app/shared/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/shared/components/login/login.component';
import { WelcomeGuard } from '@src/app/shared/guards/welcome.guard';

// These routes are shared between mobile and web
export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent},
  { path: 'login', component: LoginComponent, canActivate: [WelcomeGuard] },
  // 'home' is different for mobile and web
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent} //TODO
];

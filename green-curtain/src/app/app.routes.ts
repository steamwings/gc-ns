import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/components/home/home.component';
import { AuthGuard } from '@src/app/guards/auth.guard';
import { WelcomeComponent } from '@src/app/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import { WelcomeGuard } from '@src/app/guards/welcome.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo:'home', pathMatch:'full' },
  { path: 'login', component: LoginComponent, canActivate: [WelcomeGuard]},
  { path: 'welcome', component: WelcomeComponent },
  
];

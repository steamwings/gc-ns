import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent, },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  
];

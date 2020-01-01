import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/components/home/home.component';
import { AuthGuard } from '@src/app/guards/auth.guard';
import { WelcomeComponent } from '@src/app/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import { WelcomeGuard } from '@src/app/guards/welcome.guard';
import { NavComponent } from '@src/app/components/nav/nav.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent},
  { path: 'login', component: LoginComponent, canActivate: [WelcomeGuard]  },
  { path: 'home', component: NavComponent, canActivate: [AuthGuard], children:[
    { path: 'v', component: HomeComponent, outlet: 'venues'},
    { path: 's', component: HomeComponent, outlet: 'search'},
    { path: 'p', component: HomeComponent, outlet: 'profile'},
  ]},
  { path: '', redirectTo:'home', pathMatch:'full' },
];

import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';

export const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
  },
  {
      path: 'home',
      component: HomeComponent,
  },
];

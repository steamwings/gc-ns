import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '@src/app/app.routes';
import { HomeComponent } from './shared/components/home/home.component';
import { AuthGuard } from '@src/app/shared/guards/auth.guard';

var webRoutes : Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
]
routes.forEach(r => webRoutes.push(r));

@NgModule({
  imports: [RouterModule.forRoot(webRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

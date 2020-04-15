import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '@src/app/app.routes';
import { HomeComponent } from '@src/app/home/home.component';
import { AuthGuard } from '@src/app/shared/guards/auth.guard';
import { environment } from '@src/environments/environment';

const webRoutes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];
routes.forEach(r => webRoutes.push(r));

@NgModule({
  imports: [RouterModule.forRoot(webRoutes, { enableTracing: environment.traceRoutes })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '@src/app/app.routes';
import { AuthGuard } from '@src/app/shared/guards/auth.guard';
import { environment } from '@src/environments/environment';
import { OrgsComponent } from './orgs/orgs.component';

var webRoutes: Routes = [
  { path: 'home', redirectTo: 'orgs', pathMatch: 'full'},
  { path: 'orgs', component: OrgsComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'orgs', pathMatch: 'full' }, // Default route
];

routes.forEach(r => webRoutes.push(r));

@NgModule({
  imports: [RouterModule.forRoot(webRoutes, { enableTracing: environment.traceRoutes })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

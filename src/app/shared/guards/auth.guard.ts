import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '@src/app/shared/services/user.service';
import { LogService } from '@src/app/shared/services/log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private user: UserService, private router: Router, private log: LogService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.log.verbose('AuthGuard activated');
    return this.checkLogin(state.url);
  }

  checkLogin(url: string) {
    if (this.user.isLoggedIn) { return true; }
    this.user.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '@src/app/shared/services/user.service';
import { LogService } from '@src/app/shared/services/log.service';


/**
 * Welcome guard ensures new users visit the welcome page
 */
@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {

  constructor(private user: UserService, private router: Router, private log: LogService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.log.verbose('Welcome Guard activated (seenWelcome: ' + this.user.seenWelcome + ')');
    if (!this.user.seenWelcome) {
      this.router.navigate(['/welcome']);
    }
    return this.user.seenWelcome;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LogService } from '../services/log.service';


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
    this.log.verbose('Welcome Guard activated');
    return this.user.seenWelcome;
  }
}

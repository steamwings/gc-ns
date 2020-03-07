import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { LoginFormUser } from '../models/user.model';
import { StorageService } from './storage.service';
import { LogService } from './log.service';
import { ApiService } from './api.service';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn$ = new BehaviorSubject<boolean>(false);
  public seenWelcome = false;
  public redirectUrl = '/home';

  constructor(
    private router: Router,
    private storage: StorageService,
    private api: ApiService,
    private log: LogService,
  ) {
    const user = storage.get<LoginFormUser>(USER_KEY);
    if (user.email) {
      this.loggedIn$.next(true);
      this.seenWelcome = true;
    }
  }

  get isLoggedIn() {
    return this.loggedIn$.value;
  }

  get isLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  login(user: LoginFormUser) { // TODO hash password
    return new Promise((resolve, reject) => {
      this.api.login(user).subscribe(
        resp => this.loginRegisterCallback(user, resp, resolve, reject),
        error => reject(error));
    });
  }

  register(user: LoginFormUser) { // TODO hash password
    return new Promise((resolve, reject) => {
      this.api.register(user).subscribe(
        resp => this.loginRegisterCallback(user, resp, resolve, reject),
        error => reject(error));
    });
  }

  private loginRegisterCallback = (user, resp, resolve, reject) => {
    this.log.verbose(JSON.stringify(resp));
    if (resp.hasOwnProperty('token')) {
      this.log.verbose('token: ' + resp.token);
      this.storage.set(TOKEN_KEY, resp.token);
      this.storage.set(USER_KEY, user);
      this.navigate();
      resolve();
    } else if (resp.hasOwnProperty('status')) {
      reject(resp.status);
    } else {
      this.log.error('No token on response!');
      reject('Something went wrong. Try again soon.');
    }
   }

  private navigate() {
    this.loggedIn$.next(true);
    if (!isNullOrUndefined(this.redirectUrl)) {
      this.log.verbose('User Service navigating to ' + this.redirectUrl);
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    } else {
      this.log.verbose('User Service navigating to home');
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.loggedIn$.next(false);
    this.storage.remove(USER_KEY);
    this.router.navigate(['/login']);
  }

  // TODO
  resetPassword(email: string) {
    return new Promise(() => {});
  }

}

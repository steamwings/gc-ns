import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginFormUser, UserProfile, UserFull, UserDetail } from '../models/user/user.model';
import { UserStorageService } from './user-storage.service';
import { LogService } from './log.service';
import { ApiService } from './api.service';
import { HttpResponse } from '@angular/common/http';
import { ObjectUtility } from '@src/app/shared/utilities/object-utility';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _user$ = new BehaviorSubject<UserDetail>(new UserDetail());
  private _profile$ = new BehaviorSubject<UserProfile>(new UserProfile());
  private _token : string;
  public seenWelcome = false;
  public redirectUrl = '/home';

  constructor(
    private router: Router,
    private storage: UserStorageService,
    private api: ApiService,
    private log: LogService,
  ) {
    const userDetail: UserDetail = storage.getUserDetail();
    const userProfile: UserProfile = storage.getUserProfile();
    // id is set to null (which == undefined) in new UserDetail()
    if (!!userDetail && userDetail.id != undefined) {
      log.verbose('User from storage: ' + JSON.stringify(userDetail));
      this._user$.next(userDetail);
      if (userProfile != null){
        this._profile$.next(userProfile);
      }
      const token = storage.getUserToken();
      if (token != null) { // TODO check token status (if expired, valid)
        this._token = token;
        this._isLoggedIn$.next(true);
        // TODO remove
        this.seenWelcome = true;
      }
    }
  }

  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }

  get isLoggedIn() {
    return this._isLoggedIn$.value;
  }

  get user$() {
    return this._user$.asObservable();
  }

  get user() {
    return this._user$.value;
  }

  get profile$() {
    return this._profile$.asObservable();
  }

  get profile() {
    return this._profile$.value;
  }

  get token() {
    return this._token;
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

  reauthenticate() {
    this.log.debug('Reauthentication requested.');
    this.redirectUrl = this.router.url;
    this.seenWelcome = true; // Assume user is not new
    this._isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  updateProfile(profile: UserProfile) {
    return new Promise((resolve, reject) => {
      this.api.setProfile(profile).subscribe(r => {
        this.log.debug("set response " + JSON.stringify(r));
        this.api.getProfile(this._user$.value.id).subscribe((r) => {
          this.log.info(JSON.stringify(r));
          this._profile$.next(r.body);
          resolve();
        }, error => reject(error));
      }, error => reject(error))
    });
  }
  
  logout() {
    this.log.debug('Performing logout...');
    this._isLoggedIn$.next(false);
    this.storage.clearUser();
    this.router.navigate(['/login']);
  }

  // TODO
  resetPassword(email: string) {
    return new Promise(() => {});
  }

  private loginRegisterCallback = (user: LoginFormUser, resp: HttpResponse<UserFull>, resolve, reject) => {
    this.log.verbose(JSON.stringify(resp));
    if (!!resp.body.token) {
      var detail = this._user$.value;
      var profile = this._profile$.value;
      this.log.verbose('token: ' + resp.body.token);
      this.log.verbose('User from callback: ' + JSON.stringify(user));

      ObjectUtility.CopyMatchingValuedProperties(resp.body.profile, profile);
      ObjectUtility.CopyMatchingValuedProperties(resp.body, detail);

      this.storage.setUserToken(resp.body.token);
      this.storage.setUserDetail(detail);
      this.storage.setUserProfile(profile);

      this._token = resp.body.token;
      this._user$.next(detail);
      this._profile$.next(profile);
      
      resolve();
      this.navigate();
    } else {
      var msg = resp.hasOwnProperty('status') ? resp.status.toString() : 'Something went wrong. Please try again soon.';
      reject(msg);
      this.log.error(msg);
    }
   }

   /**
    * Navigate the user to their requested destination after authentication.
    * @description Generally, we use NativeScript routing extensions for mobile (by using template directives)
    * but in this case that might be overcomplicated.
    */
  private navigate() {
    this._isLoggedIn$.next(true);
    if (!this.redirectUrl) {
      this.log.verbose('User service navigating to ' + this.redirectUrl);
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    } else {
      this.log.verbose('User service navigating to home');
      this.router.navigate(['/home']);
    }
  }

}

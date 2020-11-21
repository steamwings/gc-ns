import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginFormUser } from '@src/app/shared/models/user/user.model';
import { UserService } from '@src/app/shared/services/user.service';
import { PopupService } from '@src/app/shared/services/popup.service';
import { BasicPopupService } from '@src/app/shared/services/basic-popup.service';
import { LogService } from '@src/app/shared/services/log.service';
import { BehaviorSubject } from 'rxjs';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^ <>() \[\]\\.,;: \s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    { provide: PopupService, useClass: BasicPopupService }
  ]
})
export class LoginComponent implements OnInit {

  isLoggingIn = true;
  title: string;
  processing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user: LoginFormUser;

  // Used in NS template to focus next box 
  @ViewChild('name') name: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('confirmPassword') confirmPassword: ElementRef;

  constructor (
    private userService: UserService,
    private popup: PopupService,
    private log: LogService,
    ) {
      this.user = new LoginFormUser();
    }

  ngOnInit() {
    this.setTitle();
  }

  private setTitle() {
    this.title = this.isLoggingIn ? 'Welcome back!' : 'Create a new account';
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
    this.setTitle();
  }

  submit() {
    let valid = false;
    if (!this.user.email || !this.user.password) {
      this.popup.warning('Please provide both an email address and password.');
    } else if (!this.user.email.match(emailRegex)) {
      this.log.debug('bad email', this.user.email)
      this.popup.warning('Please enter a valid email.');
    // else if(user exists)
    } else {
      valid = true;
    }
    if (!valid) { return; }

    this.processing.next(true);
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.userService.login(this.user)
      .then(() => {
        // this.routerExtensions.navigate(["/home"], { clearHistory: true });
        // this.router.navigate(['/home']);
        this.processing.next(false);
        this.log.debug('LoginComponent: logged in');
      }).catch((code) => {
        this.processing.next(false);
        this.popup.warning(`Login failed. ${code}`);
      });
  }

  register() {
    if (this.user.password !== this.user.confirmPassword) {
      this.processing.next(false);
      this.popup.warning('Your passwords do not match.');
      return;
    }
    this.userService.register(this.user)
      .then(() => {
        this.processing.next(false);
        this.log.debug('LoginComponent: registered');
      }).catch((code) => {
        // TODO handle dupes!
        this.processing.next(false);
        this.popup.warning(`Register failed. ${code}`);
      });
  }

  // Big fat TODO
  forgotPassword() {
    this.popup.prompt({
      title: 'Forgot Password',
      message: 'Enter the email address you used to register.',
      inputType: 'email',
      defaultText: '',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }, ((data) => {
      if (data.result) {
        this.userService.resetPassword(data.text.trim())
          .then(() => {
            this.popup.warning('Your password was reset.');
          }).catch(() => {
            this.popup.warning('Unfortunately, an error occurred resetting your password.');
          });
      }
    }));
  }

  focusEmail() {
    this.email.nativeElement.focus();
  }
  focusPassword() {
    this.password.nativeElement.focus();
  }
  passwordReturn() {
    if (this.isLoggingIn) {
      this.submit();
    } else {
      this.confirmPassword.nativeElement.focus();
    }
  }
}

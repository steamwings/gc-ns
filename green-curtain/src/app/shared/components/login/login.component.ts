import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormUser } from '@src/app/shared/models/user.model';
import { UserService } from '@src/app/shared/services/user.service';
import { PopupService } from '../../services/popup.service';
import { BasicPopupService } from '../../services/basic-popup.service';
import { LogService } from '../../services/log.service';

let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^ <>() \[\]\\.,;: \s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    { provide: PopupService, useClass: BasicPopupService }
  ]
})
export class LoginComponent implements OnInit {

  title = "Green Curtain";
  isLoggingIn: boolean = true;
  processing: boolean = false;
  user: LoginFormUser;
  @ViewChild("name", { static: false }) name: ElementRef;
  @ViewChild("email", { static: false }) email: ElementRef;
  @ViewChild("password", { static: false }) password: ElementRef;
  @ViewChild("confirmPassword", { static: false }) confirmPassword: ElementRef;
  
  constructor(
    private userService: UserService,
    private popup: PopupService,
    private log: LogService,
    ) { 
    this.user = new LoginFormUser();
  }

  ngOnInit() {
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
    let valid = false;
    if (!this.user.email || !this.user.password) {
      this.popup.warning("Please provide both an email address and password.");
    } else if(!this.user.email.match(emailRegex)) {
      this.log.debug("bad email", this.user.email)
      this.popup.warning("Please enter a valid email.");
    // else if(user exists)
    } else {
      valid = true;
    }
    if(!valid) return;

    this.processing = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.userService.login(this.user)
      .then(() => {
        this.processing = false;
        //this.routerExtensions.navigate(["/home"], { clearHistory: true });
        //this.router.navigate(['/home']);
      })
      .catch(() => {
        this.processing = false;
        this.popup.warning("Unfortunately we could not find your account.");
      });
  }

  register() {
    if (this.user.password != this.user.confirmPassword) {
      this.popup.warning("Your passwords do not match.");
      this.processing = false;
      return;
    }
    this.userService.register(this.user)
      .then(() => {
        this.processing = false;
        this.popup.warning("Your account was successfully created.");
        this.isLoggingIn = true;
      })
      .catch(() => {
        this.processing = false;
        this.popup.warning("We were unable to create your account.");
      });
  }

  // Big fat TODO
  forgotPassword() {
    this.popup.prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register.",
      inputType: "email",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    },((data) => {
      if (data.result) {
        this.userService.resetPassword(data.text.trim())
          .then(() => {
            this.popup.warning("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
          }).catch(() => {
            this.popup.warning("Unfortunately, an error occurred resetting your password.");
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
  focusConfirmPassword() {
    if (!this.isLoggingIn) {
      this.confirmPassword.nativeElement.focus();
    }
  }
}

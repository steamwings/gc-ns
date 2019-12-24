import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormUser } from '@src/app/models/user.model';
import { AuthService } from '@src/app/services/auth.service';
import { Util } from '@src/app/util/util.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggingIn: boolean = true;
  processing: boolean = false;
  user: LoginFormUser;
  @ViewChild("password", { static: false }) password: ElementRef;
  @ViewChild("confirmPassword", { static: false }) confirmPassword: ElementRef;
  
  constructor(private router: Router, private authService: AuthService) { 
    this.user = new LoginFormUser();
  }

  ngOnInit() {
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
    if (!this.user.email || !this.user.password) {
      Util.alert("Please provide both an email address and password.");
      return;
    }

    this.processing = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.authService.login(this.user)
      .then(() => {
        this.processing = false;
        //this.routerExtensions.navigate(["/home"], { clearHistory: true });
        this.router.navigate(['/home']);
      })
      .catch(() => {
        this.processing = false;
        Util.alert("Unfortunately we could not find your account.");
      });
  }

  register() {
    if (this.user.password != this.user.confirmPassword) {
      Util.alert("Your passwords do not match.");
      this.processing = false;
      return;
    }
    this.authService.register(this.user)
      .then(() => {
        this.processing = false;
        Util.alert("Your account was successfully created.");
        this.isLoggingIn = true;
      })
      .catch(() => {
        this.processing = false;
        Util.alert("We were unable to create your account.");
      });
  }

  forgotPassword() {
    Util.prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register.",
      inputType: "email",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    },((data) => {
      if (data.result) {
        this.authService.resetPassword(data.text.trim())
          .then(() => {
            Util.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
          }).catch(() => {
            Util.alert("Unfortunately, an error occurred resetting your password.");
          });
      }
    }));
  }

  focusPassword() {
    this.password.nativeElement.focus();
  }
  focusConfirmPassword() {
    if (!this.isLoggingIn) {
      this.confirmPassword.nativeElement.focus();
    }
  }

  alert(message: string) {
    return Util.alert({
      title: "APP NAME",
      okButtonText: "OK",
      message: message
    });
  }

}

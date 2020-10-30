import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
//import { ActionBarComponent } from '@nativescript/angular'

/**
 * The first component seen for mobile and web.
 */
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = 'Welcome!';
  buttonText = 'Get Started';
  bannerText = 'Green Curtain';
  tagline = 'The ultimate tool for actors and artists.';

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.user.seenWelcome = true;
  }

  login() {
    // this.router.navigate(['/review']);
    this.router.navigate(['/login']); // TODO Don't forget to put this back
  }

}

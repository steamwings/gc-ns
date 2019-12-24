import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = 'Welcome!';
  bannerText = 'Green Curtain';
  tagline = 'the ultimate tool for actors and artists';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['/login']);
  }

}

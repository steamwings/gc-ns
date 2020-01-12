import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loggedIn = this.authService.isLoggedIn$();

  LogX(){
    if(this.authService.isLoggedIn){
      this.router.navigate(['/login'])
    } else {
      this.authService.logout();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  loggedIn = this.userService.isLoggedIn$;

  LogX(){
    if(this.userService.isLoggedIn){
      this.userService.logout();
    } else {
      this.router.navigate(['/login'])
    }
  }

}

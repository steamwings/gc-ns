import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@src/app/shared/services/user.service';
import { BehaviorSubject } from 'rxjs';

/**
 * Web-only navigation component
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedIn = this.userService.isLoggedIn$;
  centerButtons: BehaviorSubject<Array<{title: string, path: string}>> = new BehaviorSubject([]);

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // TODO: retrieve from server
    // TODO: Create search and use query params to filter
    const btns = [
      {title: 'Auditions', path: '/search?type=audition'},
      {title: 'Organizations', path: '/search?type=orgs'},
      {title: 'People', path: '/search?type=people'},
    ];
    this.centerButtons.next(btns);
  }

  go(somewhere: string) {
    this.router.navigate([somewhere]);
  }

  logX() {
    if (this.userService.isLoggedIn) {
      this.userService.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }

}

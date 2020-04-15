import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit() {
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

}

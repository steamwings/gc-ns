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
  title = 'Profile';
  private name = 'Sam Doe';
  private dob = 'September 3rd, 1989';
  private cogs = String.fromCharCode(0xf085);
  private locked = String.fromCharCode(0xf023);
  private unlocked = String.fromCharCode(0xf3c1);
  private info = [
    {text: `${this.name}`, lockable: false },
    {text: `born ${this.dob}`, lockable: true, locked: false },
    {text: 'actor, radio host'}
  ];

  ngOnInit() {
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  addExperience() {
    
  }

}

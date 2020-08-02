import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { UserProfile } from '../shared/models/user/user.model';
import { LogService } from '../shared/services/log.service';
import { PopupService } from '../shared/services/popup.service';
import { Observable } from 'rxjs';
import { MyLetDirective } from '../shared/directives/my-let.directive';
import { BasicPopupService } from '../shared/services/basic-popup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    { provide: PopupService, useClass: BasicPopupService }
  ]
})
export class ProfileComponent implements OnInit {

  constructor(private userSvc: UserService, private router: Router, 
    private popups: PopupService, private log: LogService) { }
  title = 'Profile';
  private name = 'Sam Doe';
  // TODO use this on profile edit page
  private cogs = String.fromCharCode(0xf085);
  private locked = String.fromCharCode(0xf023);
  private unlocked = String.fromCharCode(0xf3c1);
  private info = [
    {text: `${this.name}`, lockable: false },
    {text: `I'm a wonderful wizard`, lockable: true, locked: false },
    {text: 'actor, radio host'}
  ];
  private profile$ = this.userSvc.profile$;

  ngOnInit() {
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  addExperience() {
    this.log.debug('adding experience...');
    var p = new UserProfile();
    p.bio = "New bio"
    p.domains = "artist, writer, photographer"
    this.userSvc.updateProfile(p)
      .then(() => {})
      .catch(() => {this.popups.warning('Profile update failed.')})
  }

}

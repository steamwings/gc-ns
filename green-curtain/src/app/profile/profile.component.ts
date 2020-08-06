import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { UserProfile } from '../shared/models/user/user.model';
import { LogService } from '../shared/services/log.service';
import { PopupService } from '../shared/services/popup.service';
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
  private cogs = String.fromCharCode(0xf085);
  private profile$ = this.userSvc.profile$;

  ngOnInit() {
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToUserDetails() {
    // In mobile, this is not preferred
    // It doesn't preserve nav history like using RouterExtensions or [nsRouterLink]
    this.router.navigate(['/account-details']);
  }

  addExperience() {
    this.log.debug('adding experience...');
    var p = new UserProfile();
    p.bio = "Art is dope"
    p.domains = "artist, writer, photographer"
    this.userSvc.updateProfile(p)
      .then(() => {})
      .catch(() => {this.popups.warning('Profile update failed.')})
  }

}

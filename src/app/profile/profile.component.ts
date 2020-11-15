import { Component, OnInit } from '@angular/core';
import { UserService } from '@src/app/shared/services/user.service';
import { UserProfile } from '@src/app/shared/models/user/user.model';
import { LogService } from '@src/app/shared/services/log.service';
import { PopupService } from '@src/app/shared/services/popup.service';
import { BasicPopupService } from '@src/app/shared/services/basic-popup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    { provide: PopupService, useClass: BasicPopupService }
  ]
})
export class ProfileComponent implements OnInit {

  constructor(
    private userSvc: UserService, 
    private popups: PopupService, 
    private log: LogService) { }
  title = 'Profile';
  cogs = String.fromCharCode(0xf085);
  profile$ = this.userSvc.profile$;

  ngOnInit() {
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

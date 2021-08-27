import { Component, Input, OnInit } from "@angular/core";
import { UserProfile } from "@src/app/shared/models/user/user.model";
import { LogService } from "@src/app/shared/services/log.service";
import { PopupService } from "@src/app/shared/services/popup.service";
import { UserService } from "@src/app/shared/services/user.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
    providers: []
  })
  export class UserProfileComponent implements OnInit { 

    @Input() profile: UserProfile;
    @Input() editable: boolean = false;

    constructor(
      private userSvc: UserService,
      private popups: PopupService, 
      private log: LogService
    ) {}

    ngOnInit() { }

    uploadPic() {
      if(!this.editable) return; // fail-safe

      this.log.debug('uploading profile pic...');
      
    }

    addExperience() {
      if(!this.editable) return; // fail-safe

      this.log.debug('adding experience...');
      var p = new UserProfile();
      p.bio = "Art is dope"
      p.domains = "artist, writer, photographer"
      this.userSvc.updateProfile(p) // This updates the logged-in user (it does not check the inputted profile)
        .then(() => {})
        .catch(() => {this.popups.warning('Profile update failed.')})
    }
  }
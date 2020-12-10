import { Component, OnInit } from '@angular/core';
import { UserService } from '@src/app/shared/services/user.service';
import { PopupService } from '@src/app/shared/services/popup.service';
import { LogService } from '@src/app/shared/services/log.service';
import { UserDetail, UserProfile } from '@src/app/shared/models/user/user.model';
import { BehaviorSubject } from 'rxjs';
import * as equal from 'fast-deep-equal'; // Switch to 'fast-deep-equal/es6'?
import { BasicPopupService } from '@src/app/shared/services/basic-popup.service';
import { ObjectUtility } from '@src/app/shared/utilities/object-utility';
import { RouterExtensions } from '@src/app/shared/modules/app-platform.module';
import { ImageServiceBase } from '@src/app/shared/services/image.service.base';
import { ApiService } from '@src/app/shared/services/api.service';

//import { AppRouter } from '@src/app/shared/services/app-router.service';

/**
 * Allow the user to view and edit personal details and profile data
 * 
 * TODO: 
 * - Update user details
 * - Add/update profile picture
 * - Email change
 * - Password change
 * - DOB
 */
@Component({
  selector: 'app-user-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  providers: [
    { provide: PopupService, useClass: BasicPopupService }
  ]
})
export class AccountDetailsComponent implements OnInit {

  title = "Account Details"
  profile: UserProfile = new UserProfile();
  user: UserDetail = new UserDetail();
  processing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private userService: UserService,
    private popup: PopupService,
    private log: LogService,
    public routerExt: RouterExtensions,
    private imageService: ImageServiceBase,
    private api: ApiService,
    ) { }

  // TODO use or delete
  private locked = String.fromCharCode(0xf023);
  private unlocked = String.fromCharCode(0xf3c1);
  private info = [
    {text: `name`, lockable: false },
    {text: `I'm a wonderful wizard`, lockable: true, locked: false },
    {text: 'actor, radio host'}
  ];

  ngOnInit() {
    this.refresh();
  }

  updateProfilePic() {
    this.api.getUploadProfilePicUrl(this.user.id).subscribe((url) => {
      this.imageService.selectImageAndUpload(url, null);
    })
  }

  refresh() {
    ObjectUtility.CopyMatchingProperties(this.userService.profile, this.profile);
    ObjectUtility.CopyMatchingProperties(this.userService.user, this.user);
  }

  submit() {
    var oldUser = this.userService.user;
    var oldProfile = this.userService.profile;

    if (!equal(this.profile, oldProfile)){
      this.userService.updateProfile(this.profile)
      .then(() => {})
      .catch(() => {this.popup.warning('Profile update failed.')})
    }
 
    if (!equal(this.user, oldUser)){
      this.log.debug("Updating user info...")
      // TODO Api call to update user info
      // TODO Process for updating email
    }
  }
}

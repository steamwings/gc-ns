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

  title = 'Profile';
  cogs = String.fromCharCode(0xf085);
  profile$ = this.userSvc.profile$;

  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit() {
  }



}

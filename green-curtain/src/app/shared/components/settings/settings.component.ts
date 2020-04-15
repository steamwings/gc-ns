import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

/**
 * TODO
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  logoutButtonText = 'Logout';
  clearButtonText = 'Clear';
  constructor(private userSvc: UserService,
    private storage: StorageService) { }

  logout() {
    this.userSvc.logout();
  }

  clearData() {
    this.storage.clearAll();
    this.userSvc.logout();
  }

}

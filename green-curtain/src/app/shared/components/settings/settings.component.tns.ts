import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { RouterExtensions } from '@nativescript/angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  logoutButtonText = 'Logout';
  clearButtonText = 'Clear All Data';
  constructor(private userSvc: UserService,
    private storage: StorageService,
    private routerExtensions: RouterExtensions) { }

  logout() {
    this.userSvc.logout();
  }

  clearData() {
    this.storage.clearAll();
    this.userSvc.logout();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }


}

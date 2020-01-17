import { Injectable } from '@angular/core';
import * as appSettings from '@nativescript/core/application-settings';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends StorageService {
  hasKey(key:string):boolean {
    return appSettings.hasKey(key);
  }
  get<T>(key: string): T {
    return JSON.parse(appSettings.getString(key)) as T;
  }
  set(key: string, val: any): void {
    appSettings.setString(key, JSON.stringify(key));
  }
  remove(key: string) {
    appSettings.remove(key);
  }
  clear() {
    appSettings.clear();
  }

  constructor() {
    super();
  }
}

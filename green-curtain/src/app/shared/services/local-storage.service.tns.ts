import { Injectable } from '@angular/core';
import * as appSettings from '@nativescript/core/application-settings';
import { StorageService } from './storage.service';

/**
 * Mobile implementation of local storage service
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends StorageService {
  constructor() {
    super();
  }
  hasKey(key:string):boolean {
    return appSettings.hasKey(key);
  }
  get<T>(key: string): T {
    return JSON.parse(appSettings.getString(key, '{}'));
  }
  set(key: string, val: any): void {
    appSettings.setString(key, JSON.stringify(key)); //TODO 
  }
  remove(key: string) {
    appSettings.remove(key);
  }
  clear() {
    appSettings.clear();
  }
}
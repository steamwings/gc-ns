import { Injectable } from '@angular/core';
import { IStorageService } from './istorageservice';
import * as appSettings from '@nativescript/core/application-settings';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements IStorageService {
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


  constructor() { }
}

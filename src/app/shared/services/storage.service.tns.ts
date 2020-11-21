import { Injectable } from '@angular/core';
import * as appSettings from '@nativescript/core/application-settings';
import { KeyValueStorage } from './key-value-storage';

/**
 * @summary Mobile implementation of KeyValueStorage
 * 
 * The use of NativeScript appSettings is conveniently OS generic, but may have privacy/security implications.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService extends KeyValueStorage {
  
  constructor() {
    super();
  }

  hasKey(key: string): boolean {
    return appSettings.hasKey(key);
  }

  get<T>(key: string): T {
    return JSON.parse(appSettings.getString(key, '{}')) as T;
  }

  set(key: string, val: any): void {
    appSettings.setString(key, JSON.stringify(val)); // TODO
  }

  remove(key: string) {
    appSettings.remove(key);
  }

  clearAll() {
    appSettings.clear();
  }
}

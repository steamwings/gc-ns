import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

/**
 * Web implementation for local storage service
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends StorageService {

  constructor() {
    super();
  }

  hasKey(key: string): boolean{
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) === key) { return true; }
    }
    return false;
  }

  get<T>(key: string) {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}

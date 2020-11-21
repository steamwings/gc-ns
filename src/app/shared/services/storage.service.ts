import { Injectable } from '@angular/core';
import { KeyValueStorage } from './key-value-storage';

/**
 * Web implementation for local storage service
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService extends KeyValueStorage {

  hasKey(key: string): boolean{
    return localStorage.getItem(key) == null;
    /**
     * TODO: Determine if this is faster:
     * for (let i = 0; i < localStorage.length; i++) {
     *   if (localStorage.key(i) === key) { return true; }
     * }
     * return false;
     */
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

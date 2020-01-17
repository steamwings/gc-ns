import { Injectable } from '@angular/core';
import { IStorageService } from './istorageservice';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements IStorageService {
  // Slow!
  hasKey(key:string):boolean{
    for(var i = 0; i < localStorage.length; i++){
      if (localStorage.key(i) == key) return true;
    }
    return false;
  }
  get<T>(key:string){
    return JSON.parse(localStorage.getItem(key)) as T;
  }
  set(key:string, val){
    localStorage.setItem(key, JSON.stringify(val));
  }
  remove(key:string){
    localStorage.removeItem(key);
  }
  clear(){
    localStorage.clear();
  }

  constructor() { }
}

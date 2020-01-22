import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  debug(msg: string){
    if(!environment.production){
      console.log(msg);
    }
  }

  info(msg: string){
    //TODO
  }

  warn(msg: string, error?){
    //TODO
  }
}

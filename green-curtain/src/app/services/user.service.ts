import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //TODO Store state in storage
  seenWelcome: boolean = false;
  constructor() { }

}

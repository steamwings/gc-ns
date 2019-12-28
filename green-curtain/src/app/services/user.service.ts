import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  knownUser: boolean = false;
  constructor() { }

}

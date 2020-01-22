import { Injectable } from '@angular/core';

@Injectable()
export abstract class PopupService {
  abstract alert(options);
  //confirm() //TODO
  abstract prompt(options);
  //toast() //TODO: use snackbars
}
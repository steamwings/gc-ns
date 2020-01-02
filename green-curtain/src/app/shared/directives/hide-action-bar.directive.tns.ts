import { Directive } from '@angular/core';
import { Page } from "@nativescript/core";

@Directive({
  selector: '[appHideActionBar]'
})
export class HideActionBarDirective {

  constructor(page: Page) { 
    page.actionBarHidden = true;
  }
  
}

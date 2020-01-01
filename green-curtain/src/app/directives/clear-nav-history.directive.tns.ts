import { Directive } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { RouterStateSnapshot } from '@angular/router';
import { Util } from '../util/util.class';

@Directive({
  selector: '[appClearNavHistory]'
})
export class ClearNavHistoryDirective {

  constructor(routerExt: RouterExtensions, state: RouterStateSnapshot) { 
    //routerExt.navigate()
    Util.alert('ClearNav called');
    routerExt.navigate([state.url], {clearHistory: true});
  }

}

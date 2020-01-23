import { Directive } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { RouterStateSnapshot } from '@angular/router';
import { LogService } from '../services/log.service';

@Directive({
  selector: '[appClearNavHistory]'
})
export class ClearNavHistoryDirective {

  constructor(routerExt: RouterExtensions, state: RouterStateSnapshot, log: LogService) { 
    log.verbose("ClearNavHistory called");
    routerExt.navigate([state.url], {clearHistory: true});
  }

}

import { Directive } from '@angular/core';
import { RouterExtensions } from "@nativescript/angular";
import { LogService } from '@src/app/shared/services/log.service';

/**
 * TODO: this does not work?
 */
@Directive({
  selector: '[appClearNavHistory]'
})
export class ClearNavHistoryDirective {

  constructor(routerExt: RouterExtensions, log: LogService) { 
    log.verbose("ClearNavHistory called");
    routerExt.navigate([routerExt.router.routerState.snapshot.url], {clearHistory: true});
  }

}

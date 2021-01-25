import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import { LogService } from './log.service';

@Injectable()
export class BasicPopupService extends PopupService {

    constructor(private log: LogService) {
        super();
    }

    warning(msg) {
        alert(msg); // TODO use snackbar
        this.log.info('Popup: ' + msg);
    }

    // TODO this
    prompt(msg) {
        // TODO Use pretty material modal thing
        prompt(msg);
    }

    // TODO toast() with snackbar
}

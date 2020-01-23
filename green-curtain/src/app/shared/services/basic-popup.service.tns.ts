import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import * as dialogs from '@nativescript/core/ui/dialogs'
import { LogService } from './log.service';

type prcallback = (value: dialogs.PromptResult) => void;

@Injectable()
export class BasicPopupService extends PopupService {

    constructor(private log:LogService) {
        super();
    }

    warning(msg, callback?: () => void) {
        dialogs.alert({
            title: "Warning",
            okButtonText: "OK",
            message: msg
        }).then(callback);
        this.log.info(msg);
    }
    //TODO
    prompt(msg, fulfilled?: prcallback, rejected?: () => void) {
        dialogs.prompt(msg).then(fulfilled, rejected);
    }
}
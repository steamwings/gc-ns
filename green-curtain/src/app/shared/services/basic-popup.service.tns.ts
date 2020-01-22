import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import * as dialogs from '@nativescript/core/ui/dialogs'

type basicCallback = () => void;
type prcallback = (value: dialogs.PromptResult) => void;

@Injectable({
    providedIn: 'root'
})
export class BasicPopupService extends PopupService {

    constructor() {
        super();
    }

    alert(options, callback?: () => void) {
        dialogs.alert(options).then(callback);
    }
    prompt(options, fulfilled?: prcallback, rejected?: () => void) {
        dialogs.prompt(options).then(fulfilled, rejected);
    }
}
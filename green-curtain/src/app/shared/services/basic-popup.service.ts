import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';

@Injectable({
    providedIn: 'root'
})
export class BasicPopupService extends PopupService{

    constructor() {
        super();
    }

    alert(options) {
        //console.log(options);
        alert(options);
    }

    prompt(options) {
        // TODO Use some material dialog thing
        prompt(options);
    }

    //TODO toast() with snackbar
}

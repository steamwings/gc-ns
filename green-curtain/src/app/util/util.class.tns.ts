import * as dialogs from '@nativescript/core/ui/dialogs'
import { UtilBase } from './util-base.class';

type callback = () => void;
type prcallback = (value: dialogs.PromptResult) => void;

export class Util implements UtilBase {
    static alert(options, callback: callback = ()=>{}){
        dialogs.alert(options).then(callback);
    }
    static prompt(options, fulfilled: prcallback, rejected: callback = ()=>{} ){
        dialogs.prompt(options).then(fulfilled, rejected);
    }
}
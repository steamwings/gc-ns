import { UtilBase } from "./util-base.class";

export class Util implements UtilBase{
    static alert(options){
        // TODO Use snackbar!
        alert(options.message);
    }

    static prompt(options, callback){
     // TODO Use some material dialog thing
        prompt(options);
    }

    // TODO Use some material dialog thing
    // confirm()
}
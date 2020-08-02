import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

interface LetContext<T> {
    myLet: T;
}
/**
 * Use and "as" a variable with the If conditional
 * (I'm not sure why this is not built into Angular.)
 * From https://gist.github.com/AustinMatherne/659f0aed22efa094d8a55f31aebfe0d4#file-let-directive-ts
 */
@Directive({
    selector: '[myLet]'
})
export class MyLetDirective<T> {
    private _context: LetContext<T> = {myLet: null};

    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext<T>>) {
        _viewContainer.createEmbeddedView(_templateRef, this._context);
    }

    @Input()
    set myLet(value: T) {
        this._context.myLet = value;
    }
}
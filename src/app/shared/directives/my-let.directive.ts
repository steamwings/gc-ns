import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

interface LetContext<T> {
    myLet: T;
}
/**
 * Enables using a variable with "as" in template code without an ngIf/ngFor
 * @example <caption> Alias a variable </caption>
 * <div *myLet="superLongVariableName as myVar">
 * @example <caption> Use async without ngFor </caption>
 * <div *myLet="val$ | async as val">
 * @description
 * The 'my' prefix is used instead of `ngLet` since ng is reserved for built-in framework directives; 
 * if `ngLet` or equivalent is added officially, then this can be removed.
 * I'm not sure why this is not built into Angular.
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
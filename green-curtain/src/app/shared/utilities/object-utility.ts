import { isNullOrUndefined } from "util";

export {};

// In Typescript, this is called augmenting the global scope
declare global {
    interface Object {
        /**
         * Non-recursively copy properties for which `this` and `target` share a key
         * @param target Object to copy properties from
         */
        copyMatchingPropertiesFrom(target: Object) : void;

        /**
         * Non-recursively copy properties for which `this` and `target` share a key
         * @param target Object to copy from
         * @param discriminator Function to evaluate values from `target`; copied when `true`
         */
        copyMatchingPropertiesFrom(target: Object, discriminator: (value: any) => boolean) : void;

        /**
         * Non-recursively copy properties which are not `null` or `undefined` 
         * and for which `this` and `target` share a key
         * @param target `Object` to copy from
         */
        copyMatchingValuedPropertiesFrom(target: Object): void;
    }
}

Object.prototype.copyMatchingPropertiesFrom = function (target: Object, 
    discriminator: (value: any) => boolean = () => true) {
    
    if (isNullOrUndefined(target)) return;
    Object.keys(target).forEach(key => {
        if (this[key] !== undefined) {
            var value = target[key];
            if (discriminator(value)) {
                this[key] = value;
            }
        }
    });
}

Object.prototype.copyMatchingValuedPropertiesFrom = function (target: Object) {
    this.copyMatchingPropertiesFrom(target, (value) => !isNullOrUndefined(value));
}
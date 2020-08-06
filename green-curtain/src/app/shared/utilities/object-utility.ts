import { isNullOrUndefined } from "util";

/**
 * Provide static functions used with `Object`s
 */
export class ObjectUtility {
    
    /**
     * Non-recursively copy properties for which `this` and `target` share a key
     * @param source `Object` to copy from
     * @param target `Object` to copy to
     * @param discriminator Function to evaluate values from `target`; copied when `true`
     */
    static CopyMatchingProperties = function (source: Object, target: Object, 
        discriminator: (value: any) => boolean = () => true) {
        
        if (isNullOrUndefined(source) || isNullOrUndefined(target)) 
            return;
        Object.keys(source).forEach(key => {
            if (target[key] !== undefined) {
                var value = source[key];
                if (discriminator(value)) {
                    target[key] = value;
                }
            }
        });
    }

    /**
     * Non-recursively copy properties which are not `null` or `undefined` 
     * and for which `this` and `target` share a key
     * @param source `Object` to copy to
     * @param target `Object` to copy from
     */
    static CopyMatchingValuedProperties = function (source: Object, target: Object) {
        this.CopyMatchingProperties(source, target, (value) => !isNullOrUndefined(value));
    }
};
import { ObjectUtility } from "./object-utility";

describe('CopyMatchingProperties', () => {

    it('should copy properties', () => {
        var o1 = {'a':0};
        var o2 = {'a':1};
        ObjectUtility.CopyMatchingProperties(o2, o1);
        // TODO: Can these be toBe instead of toEqual?
        expect(o1).toEqual(o2);
    })

    it('should only copy matching properties', () => {
        var o1 = {'a':4, 'b':8}
        var o2 = {'a':6, 'b':7, 'c':8}
        ObjectUtility.CopyMatchingProperties(o2, o1);
        expect(o1).toEqual({'a':6, 'b':7});
    })

    it('should do nothing when no properties match', () => {
        var o1 = {'a':4, 'b':8}
        var o2 = {'c':6, 'd':7, 'e':8}
        ObjectUtility.CopyMatchingProperties(o2, o1);
        expect(o1).toEqual({'a':4, 'b':8});
    })

    it('should only copy when discriminator returns true', () => {
        var o1 = {'a':4, 'b':8}
        var o2 = {'a':6, 'b':7, 'c':8}
        ObjectUtility.CopyMatchingProperties(o2, o1, (value) => value != 7);
        expect(o1).toEqual({'a':6, 'b':8});
    })
    
});

describe('CopyMatchingValuedProperties', () => {
    it('should copy values with values', () => {
        var o1 = {'a':4, 'b':8, 'c': 9}
        var o2 = {'a':6, 'b':null, 'c':undefined}
        ObjectUtility.CopyMatchingProperties(o2, o1);
        expect(o1).toEqual({'a':6, 'b':8, 'c': 9});
    })
});
  
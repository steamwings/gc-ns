import "./object-utility"

describe('copyMatchingPropertiesFrom', () => {

    it('should copy properties', () => {
        var o1 = {'a':0};
        var o2 = {'a':1};
        o1.copyMatchingPropertiesFrom(o2);
        expect(o1).toEqual(o2);
    })

    it('should only copy matching properties', () => {
        var o1 = {'a':4, 'b':8}
        var o2 = {'a':6, 'b':7, 'c':8}
        o1.copyMatchingPropertiesFrom(o2);
        expect(o1).toEqual({'a':6, 'b':7});
    })

    it('should do nothing when no properties match', () => {
        var o1 = {'a':4, 'b':8}
        var o2 = {'c':6, 'd':7, 'e':8}
        o1.copyMatchingPropertiesFrom(o2);
        expect(o1).toEqual({'a':4, 'b':8});
    })

    it('should only copy when discriminator returns true', () => {
        var o1 = {'a':4, 'b':8}
        var o2 = {'a':6, 'b':7, 'c':8}
        o1.copyMatchingPropertiesFrom(o2, (value) => value != 7);
        expect(o1).toEqual({'a':6, 'b':8});
    })
    
});
  
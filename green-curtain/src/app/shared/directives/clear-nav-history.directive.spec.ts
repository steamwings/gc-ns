import { ClearNavHistoryDirective } from '@src/app/shared/directives/clear-nav-history.directive';

describe('ClearNavHistoryDirective', () => {
  it('should create an instance', () => {
    const directive = new ClearNavHistoryDirective(null, {root:null,url:''});
    expect(directive).toBeTruthy();
  });
});

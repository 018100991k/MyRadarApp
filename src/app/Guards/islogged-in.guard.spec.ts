import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { isloggedInGuard } from './islogged-in.guard';

describe('isloggedInGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isloggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { WPeerService } from './w-peer.service';

describe('WPeerService', () => {
  let service: WPeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WPeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

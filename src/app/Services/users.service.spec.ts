import { TestBed } from '@angular/core/testing';

import { UsersService } from './fire-database.service';

describe('PlacesService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

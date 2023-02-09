import { TestBed } from '@angular/core/testing';

import { NetworkCheckerService } from './network-checker.service';

describe('NetworkCheckerService', () => {
  let service: NetworkCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

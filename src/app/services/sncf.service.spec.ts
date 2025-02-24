import { TestBed } from '@angular/core/testing';

import { SncfService } from './sncf.service';

describe('SncfService', () => {
  let service: SncfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SncfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

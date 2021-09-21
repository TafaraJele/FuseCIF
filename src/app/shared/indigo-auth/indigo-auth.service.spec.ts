import { TestBed } from '@angular/core/testing';

import { IndigoAuthService } from './indigo-auth.service';

describe('IndigoAuthService', () => {
  let service: IndigoAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndigoAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

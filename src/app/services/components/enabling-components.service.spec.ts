import { TestBed } from '@angular/core/testing';

import { EnablingComponentsService } from './enabling-components.service';

describe('EnablingComponentsService', () => {
  let service: EnablingComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnablingComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

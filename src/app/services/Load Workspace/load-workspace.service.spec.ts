import { TestBed } from '@angular/core/testing';

import { LoadWorkspaceService } from '../Load Workspace/load-workspace.service';

describe('LoadWorkspaceService', () => {
  let service: LoadWorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadWorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

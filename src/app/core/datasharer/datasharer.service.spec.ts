import { TestBed } from '@angular/core/testing';

import { DatasharerService } from './datasharer.service';

describe('DatasharerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatasharerService = TestBed.get(DatasharerService);
    expect(service).toBeTruthy();
  });
});

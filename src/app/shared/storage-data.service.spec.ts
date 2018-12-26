import { TestBed } from '@angular/core/testing';

import { StorageDataService } from './storage-data.service';

describe('StorageDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageDataService = TestBed.get(StorageDataService);
    expect(service).toBeTruthy();
  });
});

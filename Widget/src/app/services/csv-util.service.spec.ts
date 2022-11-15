import { TestBed } from '@angular/core/testing';

import { CsvUtilService } from './csv-util.service';

describe('CsvUtilService', () => {
  let service: CsvUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

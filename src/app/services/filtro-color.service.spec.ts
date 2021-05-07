import { TestBed } from '@angular/core/testing';

import { FiltroColorService } from './filtro-color.service';

describe('FiltroColorService', () => {
  let service: FiltroColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltroColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

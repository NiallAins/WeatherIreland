import { TestBed } from '@angular/core/testing';

import { City } from './city.service';

describe('StateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: City = TestBed.get(City);
    expect(service).toBeTruthy();
  });
});

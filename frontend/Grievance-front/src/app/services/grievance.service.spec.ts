import { TestBed, inject } from '@angular/core/testing';

import { GrievanceService } from './grievance.service';

describe('GrievanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrievanceService]
    });
  });

  it('should be created', inject([GrievanceService], (service: GrievanceService) => {
    expect(service).toBeTruthy();
  }));
});

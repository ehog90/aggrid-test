import { TestBed, inject } from '@angular/core/testing';

import { VisibilityService } from './visibility.service';

describe('VisibilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisibilityService]
    });
  });

  it('should ...', inject([VisibilityService], (service: VisibilityService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { GetContentService } from './get-content.service';

describe('GetContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetContentService]
    });
  });

  it('should be created', inject([GetContentService], (service: GetContentService) => {
    expect(service).toBeTruthy();
  }));
});

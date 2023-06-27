import { TestBed } from '@angular/core/testing';

import { RecipeResolverrService } from './recipe-resolverr.service';

describe('RecipeResolverrService', () => {
  let service: RecipeResolverrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeResolverrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

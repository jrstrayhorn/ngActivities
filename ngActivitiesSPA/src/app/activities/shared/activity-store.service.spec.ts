/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActivityStore } from './activity-store.service';

describe('Service: ActivityStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityStore],
    });
  });

  it('should ...', inject([ActivityStore], (service: ActivityStore) => {
    expect(service).toBeTruthy();
  }));
});

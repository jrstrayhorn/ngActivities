import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { ActivityState } from './activity-state';

export enum ActivityStoreActions {
  InitState = 'INIT_STATE',
}

@Injectable({
  providedIn: 'root',
})
export class ActivityStore extends ObservableStore<ActivityState> {
  constructor() {
    super({});
    this.setState(
      { title: 'Hello from observable store' },
      ActivityStoreActions.InitState
    );
  }

  getTitle() {
    return this.getState().title;
  }
}

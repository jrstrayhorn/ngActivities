import { ActivityService } from './activity.service';
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
  constructor(private activityService: ActivityService) {
    super({});
    this.setState(
      { activities: [], loadingInitial: false },
      ActivityStoreActions.InitState
    );
  }

  loadActivities() {
    this.setState({ ...this.getState(), loadingInitial: true });
    this.activityService.getAll().subscribe(
      (data) => {
        const activities = [];
        data.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        this.setState({ ...this.getState(), activities });
      },
      () => {},
      () => this.setState({ ...this.getState(), loadingInitial: false })
    );
  }

  // getTitle() {
  //   return this.getState().title;
  // }
}

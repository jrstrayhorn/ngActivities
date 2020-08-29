import { ActivityService } from './activity.service';
import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { IActivity } from './activity.model';

export interface ActivityState {
  activities: IActivity[];
  selectedActivity: IActivity;
  loadingInitial: boolean;
  editMode: boolean;
}

export enum ActivityStoreActions {
  InitState = 'INIT_STATE',
}

@Injectable({
  providedIn: 'root',
})
export class ActivityStore extends ObservableStore<ActivityState> {
  constructor(private activityService: ActivityService) {
    super({});
    this.setState(this.getInitialState(), ActivityStoreActions.InitState);
  }

  private getInitialState(): ActivityState {
    return {
      activities: [],
      loadingInitial: false,
      selectedActivity: null,
      editMode: false,
    };
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

  selectActivity(id: string) {
    const state = this.getState();
    this.setState({
      ...state,
      selectedActivity: state.activities.find((a) => a.id === id),
      editMode: false,
    });
  }

  // getTitle() {
  //   return this.getState().title;
  // }
}

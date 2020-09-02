import { ActivityService } from './activity.service';
import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { IActivity } from './activity.model';

export interface ActivityState {
  activities: IActivity[];
  selectedActivity: IActivity;
  loadingInitial: boolean;
  editMode: boolean;
  submitting: boolean;
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
      submitting: false,
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
        this.setState({
          ...this.getState(),
          activities: this.sortActivitiesByDate(activities),
        });
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

  createActivity(activity: IActivity) {
    this.setState({ ...this.getState(), submitting: true });
    this.activityService.create(activity).subscribe(
      () => {
        const state = this.getState();
        this.setState({
          ...state,
          activities: this.sortActivitiesByDate([
            ...state.activities,
            activity,
          ]),
          selectedActivity: activity,
          editMode: false,
        });
      },
      () => {},
      () => this.setState({ ...this.getState(), submitting: false })
    );
  }

  openCreateForm() {
    this.setState({
      ...this.getState(),
      selectedActivity: null,
      editMode: true,
    });
  }

  private sortActivitiesByDate(activities: IActivity[]): IActivity[] {
    return activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  // getTitle() {
  //   return this.getState().title;
  // }
}

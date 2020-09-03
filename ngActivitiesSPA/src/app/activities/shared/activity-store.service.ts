import { ActivityService } from './activity.service';
import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { IActivity } from './activity.model';
import { stringify } from 'querystring';

export interface ActivityState {
  activities: IActivity[];
  selectedActivity: IActivity;
  loadingInitial: boolean;
  editMode: boolean;
  submitting: boolean;
  target: string;
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
      target: '',
    };
  }

  loadActivities() {
    this.setState({ loadingInitial: true });
    this.activityService.getAll().subscribe(
      (data) => {
        const activities = [];
        data.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        this.setState({
          activities: this.sortActivitiesByDate(activities),
        });
      },
      () => {},
      () => this.setState({ loadingInitial: false })
    );
  }

  selectActivity(id: string) {
    this.setState({
      selectedActivity: this.getState().activities.find((a) => a.id === id),
      editMode: false,
    });
  }

  createActivity(activity: IActivity) {
    this.setState({ submitting: true });
    this.activityService.create(activity).subscribe(
      () => {
        this.setState({
          activities: this.sortActivitiesByDate([
            ...this.getState().activities,
            activity,
          ]),
          selectedActivity: activity,
          editMode: false,
        });
      },
      () => {},
      () => this.setState({ submitting: false })
    );
  }

  editActivity(activity: IActivity) {
    this.setState({ submitting: true });
    this.activityService.update(activity).subscribe(
      () => {
        this.setState({
          activities: this.sortActivitiesByDate([
            ...this.getState().activities.filter((a) => a.id !== activity.id),
            activity,
          ]),
          selectedActivity: activity,
          editMode: false,
        });
      },
      () => {},
      () => this.setState({ submitting: false })
    );
  }

  openCreateForm() {
    this.setState({
      selectedActivity: null,
      editMode: true,
    });
  }

  changeEditMode(isEdit: boolean): void {
    this.setState({
      editMode: isEdit,
    });
  }

  changeSelectedActivity(selectedActivity: IActivity): void {
    this.setState({
      selectedActivity,
    });
  }

  deleteActivity(id: string): void {
    this.setState({ submitting: true, target: id });
    this.activityService.delete(id).subscribe(() => {
      this.setState({
        activities: this.sortActivitiesByDate([
          ...this.getState().activities.filter((a) => a.id !== id),
        ]),
        submitting: false,
      });
    });
  }

  private sortActivitiesByDate(activities: IActivity[]): IActivity[] {
    return activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  // getTitle() {
  //   return this.getState().title;
  // }
}

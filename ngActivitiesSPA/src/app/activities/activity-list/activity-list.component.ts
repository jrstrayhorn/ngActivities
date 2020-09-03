import { Observable } from 'rxjs';
import {
  ActivityStore,
  ActivityState,
} from './../shared/activity-store.service';
import { IActivity } from './../shared/activity.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
})
export class ActivityListComponent implements OnInit {
  activityState$: Observable<ActivityState>;

  constructor(private activityStore: ActivityStore) {}

  ngOnInit() {
    this.activityState$ = this.activityStore.stateChanged;
  }

  selectActivity(activity: IActivity) {
    this.activityStore.selectActivity(activity.id);
  }

  deleteActivity(activity: IActivity) {
    this.activityStore.deleteActivity(activity.id);
  }
}

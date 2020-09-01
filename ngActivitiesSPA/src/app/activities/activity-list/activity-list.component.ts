import { Observable } from 'rxjs';
import { ActivityStore } from './../shared/activity-store.service';
import { IActivity } from './../shared/activity.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
})
export class ActivityListComponent implements OnInit {
  activities$: Observable<IActivity[]>;

  @Input() submitting: boolean;
  @Input() target: string;

  @Output() deletedActivity = new EventEmitter<string>();

  constructor(private activityStore: ActivityStore) {}

  ngOnInit() {
    this.activities$ = this.activityStore.stateChanged.pipe(
      map((state) => {
        if (state) {
          return state.activities;
        }
      })
    );
  }

  selectActivity(activity: IActivity) {
    this.activityStore.selectActivity(activity.id);
  }

  deleteActivity(activity: IActivity) {
    this.deletedActivity.emit(activity.id);
  }
}

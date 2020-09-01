import { Observable } from 'rxjs';
import { IActivity } from './../shared/activity.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivityState, ActivityStore } from '../shared/activity-store.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],
})
export class ActivityDetailsComponent implements OnInit {
  activityState$: Observable<ActivityState>;

  @Output() changedEditMode = new EventEmitter<boolean>();
  @Output() changedCurrentActivity = new EventEmitter<IActivity>();

  constructor(private activityStore: ActivityStore) {}

  ngOnInit() {
    this.activityState$ = this.activityStore.stateChanged;
  }

  setEditMode(isEdit: boolean) {
    this.changedEditMode.emit(isEdit);
  }

  setCurrentActivity() {
    this.changedCurrentActivity.emit(null);
  }
}

import { ActivityStore } from './../shared/activity-store.service';
import { IActivity } from './../shared/activity.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityState } from '../shared/activity-store.service';

@Component({
  selector: 'app-activity-dashboard',
  templateUrl: './activity-dashboard.component.html',
  styleUrls: ['./activity-dashboard.component.css'],
})
export class ActivityDashboardComponent implements OnInit {
  activityState$: Observable<ActivityState>;

  @Input() submitting: boolean;
  @Input() target: string;

  @Output() deletedActivity = new EventEmitter<string>();

  @Output() changedEditMode = new EventEmitter<boolean>();

  @Output() changedCurrentActivity = new EventEmitter<IActivity>();
  @Output() editedActivity = new EventEmitter<IActivity>();

  constructor(private activityStore: ActivityStore) {}

  ngOnInit() {
    this.activityState$ = this.activityStore.stateChanged;
  }

  onDeletedActivity(id: string): void {
    this.deletedActivity.emit(id);
  }

  onChangedEditMode(isEdit: boolean): void {
    this.changedEditMode.emit(isEdit);
  }

  onChangedCurrentActivity(activity: IActivity): void {
    this.changedCurrentActivity.emit(activity);
  }

  onEditedActivity(activity: IActivity): void {
    this.editedActivity.emit(activity);
  }
}

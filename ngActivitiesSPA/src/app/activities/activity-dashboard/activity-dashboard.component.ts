import { IActivity } from './../shared/activity.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activity-dashboard',
  templateUrl: './activity-dashboard.component.html',
  styleUrls: ['./activity-dashboard.component.css'],
})
export class ActivityDashboardComponent implements OnInit {
  @Input() activities: IActivity[];
  @Input() currentActivity: IActivity;
  @Input() editMode: boolean;

  @Output() changedActivity = new EventEmitter<string>();
  @Output() deletedActivity = new EventEmitter<string>();

  @Output() changedEditMode = new EventEmitter<boolean>();

  @Output() changedCurrentActivity = new EventEmitter<IActivity>();
  @Output() createdActivity = new EventEmitter<IActivity>();
  @Output() editedActivity = new EventEmitter<IActivity>();

  constructor() {}

  ngOnInit() {}

  onSelectedActivity(id: string): void {
    this.changedActivity.emit(id);
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

  onCreatedActivity(activity: IActivity): void {
    this.createdActivity.emit(activity);
  }

  onEditedActivity(activity: IActivity): void {
    this.editedActivity.emit(activity);
  }
}

import { IActivity } from './../shared/activity.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
})
export class ActivityListComponent implements OnInit {
  @Input() activities: IActivity[];
  @Input() submitting: boolean;

  @Output() selectedActivity = new EventEmitter<string>();
  @Output() deletedActivity = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  selectActivity(activity: IActivity) {
    this.selectedActivity.emit(activity.id);
  }

  deleteActivity(activity: IActivity) {
    this.deletedActivity.emit(activity.id);
  }
}

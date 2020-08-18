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

  @Output() changedActivity = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSelectedActivity(id: string): void {
    this.changedActivity.emit(id);
  }
}

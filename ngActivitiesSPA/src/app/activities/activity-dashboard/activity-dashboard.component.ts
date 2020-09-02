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

  constructor(private activityStore: ActivityStore) {}

  ngOnInit() {
    this.activityState$ = this.activityStore.stateChanged;
  }

  onDeletedActivity(id: string): void {
    this.deletedActivity.emit(id);
  }
}

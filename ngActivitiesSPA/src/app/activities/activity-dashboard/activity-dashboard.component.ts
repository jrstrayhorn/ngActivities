import { ActivityStore } from './../shared/activity-store.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityState } from '../shared/activity-store.service';

@Component({
  selector: 'app-activity-dashboard',
  templateUrl: './activity-dashboard.component.html',
  styleUrls: ['./activity-dashboard.component.css'],
})
export class ActivityDashboardComponent implements OnInit {
  activityState$: Observable<ActivityState>;

  constructor(private activityStore: ActivityStore) {}

  ngOnInit() {
    this.activityState$ = this.activityStore.stateChanged;
  }
}

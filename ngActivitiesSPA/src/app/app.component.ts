import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  ActivityStore,
  ActivityState,
} from './activities/shared/activity-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  activityState$: Observable<ActivityState>;

  constructor(public activityStore: ActivityStore) {}

  ngOnInit(): void {
    this.activityState$ = this.activityStore.stateChanged;
    this.activityStore.loadActivities();
  }
}

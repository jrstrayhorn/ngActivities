import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivityState, ActivityStore } from '../shared/activity-store.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],
})
export class ActivityDetailsComponent implements OnInit {
  activityState$: Observable<ActivityState>;

  constructor(private activityStore: ActivityStore) {}

  ngOnInit() {
    this.activityState$ = this.activityStore.stateChanged;
  }

  setEditMode(isEdit: boolean) {
    this.activityStore.changeEditMode(isEdit);
  }

  setCurrentActivity() {
    this.activityStore.changeSelectedActivity(null);
  }
}

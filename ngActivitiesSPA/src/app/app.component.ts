import { Observable } from 'rxjs';
import { ActivityService } from './activities/shared/activity.service';
import { IActivity } from './activities/shared/activity.model';
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
  activities: IActivity[];
  submitting = false;
  target = '';
  activityState$: Observable<ActivityState>;

  constructor(
    private activityService: ActivityService,
    public activityStore: ActivityStore
  ) {}

  ngOnInit(): void {
    this.activityState$ = this.activityStore.stateChanged;
    this.activityStore.loadActivities();
  }

  onDeletedActivity(id: string): void {
    this.submitting = true;
    this.target = id;
    this.activityService.delete(id).subscribe(() => {
      this.activities = [...this.activities.filter((a) => a.id !== id)];
      this.submitting = false;
    });
  }
}

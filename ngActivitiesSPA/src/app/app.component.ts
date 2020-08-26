import { ActivityService } from './activities/shared/activity.service';
import { IActivity } from './activities/shared/activity.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  activities: IActivity[];
  currentActivity: IActivity;
  editMode = false;
  loading = true;
  submitting = false;
  target = '';

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.getAll().subscribe((data) => {
      const activities = [];
      data.forEach((activity) => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      this.activities = activities;
      this.loading = false;
    });
  }

  onChangedActivity(id: string): void {
    this.currentActivity = this.activities.find((a) => a.id === id);
    this.editMode = false;
  }

  onDeletedActivity(id: string): void {
    this.submitting = true;
    this.target = id;
    this.activityService.delete(id).subscribe(() => {
      this.activities = [...this.activities.filter((a) => a.id !== id)];
      this.submitting = false;
    });
  }

  onChangedEditMode(isEdit: boolean): void {
    this.editMode = isEdit;
  }

  onOpenedCreateForm(): void {
    this.currentActivity = null;
    this.editMode = true;
  }

  onChangedCurrentActivity(activity: IActivity): void {
    this.currentActivity = activity;
  }

  onCreatedActivity(activity: IActivity): void {
    this.submitting = true;
    this.activityService.create(activity).subscribe(
      () => {
        this.activities = [...this.activities, activity];
        this.currentActivity = activity;
        this.editMode = false;
      },
      () => {},
      () => (this.submitting = false)
    );
  }

  onEditedActivity(activity: IActivity): void {
    this.submitting = true;
    this.activityService.update(activity).subscribe(
      () => {
        this.activities = [
          ...this.activities.filter((a) => a.id !== activity.id),
          activity,
        ];
        this.currentActivity = activity;
        this.editMode = false;
      },
      () => {},
      () => (this.submitting = false)
    );
  }
}

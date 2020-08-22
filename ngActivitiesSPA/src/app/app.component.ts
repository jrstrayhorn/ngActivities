import { IActivity } from './activities/shared/activity.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  activities: IActivity[];
  currentActivity: IActivity;
  editMode = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<IActivity[]>('https://localhost:5001/api/activities')
      .subscribe((data) => {
        const activities = [];
        data.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        this.activities = activities;
      });
  }

  onChangedActivity(id: string): void {
    this.currentActivity = this.activities.find((a) => a.id === id);
    this.editMode = false;
  }

  onDeletedActivity(id: string): void {
    this.activities = [...this.activities.filter((a) => a.id !== id)];
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
    this.activities = [...this.activities, activity];
    this.currentActivity = activity;
    this.editMode = false;
  }

  onEditedActivity(activity: IActivity): void {
    this.activities = [
      ...this.activities.filter((a) => a.id !== activity.id),
      activity,
    ];
    this.currentActivity = activity;
    this.editMode = false;
  }
}

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
  selectedActivity: IActivity;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<IActivity[]>('https://localhost:5001/api/activities')
      .subscribe((data) => (this.activities = data));
  }

  onChangedActivity(id: string): void {
    console.log(id);
    // this.selectedActivity = this.activities.find((a) => a.id === id);
  }
}

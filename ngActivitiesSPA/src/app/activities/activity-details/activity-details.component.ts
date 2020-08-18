import { IActivity } from './../shared/activity.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],
})
export class ActivityDetailsComponent implements OnInit {
  @Input() currentActivity: IActivity;

  constructor() {}

  ngOnInit() {}
}

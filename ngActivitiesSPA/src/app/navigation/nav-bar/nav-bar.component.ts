import { ActivityStore } from './../../activities/shared/activity-store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private activityStore: ActivityStore) {}

  ngOnInit() {}

  openCreateForm() {
    this.activityStore.openCreateForm();
  }
}

import { LoadingComponent } from './shared/loading/loading.component';
import { ActivityFormComponent } from './activities/activity-form/activity-form.component';
import { ActivityDetailsComponent } from './activities/activity-details/activity-details.component';
import { ActivityListComponent } from './activities/activity-list/activity-list.component';
import { ActivityDashboardComponent } from './activities/activity-dashboard/activity-dashboard.component';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ActivityDashboardComponent,
    ActivityListComponent,
    ActivityDetailsComponent,
    ActivityFormComponent,
    LoadingComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

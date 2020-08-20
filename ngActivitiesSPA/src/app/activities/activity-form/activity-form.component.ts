import { IActivity } from './../shared/activity.model';
import {
  SimpleChanges,
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css'],
})
export class ActivityFormComponent implements OnInit, OnChanges {
  @Input() currentActivity: IActivity;
  @Output() changedEditMode = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
    // is the first time? Yes but this value might change more than once
    // this would work the first time but not on the changes to currentActivtiy
    // need to use OnNgChanges() to check for null and set to empty object
    // console.log(this.activity);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentActivity = this.initializeForm(
      changes.currentActivity.currentValue
    );
  }

  handleInputChange(inputEl: HTMLInputElement | HTMLTextAreaElement) {
    this.setActivity(inputEl);
  }

  setEditMode(isEdit: boolean) {
    this.changedEditMode.emit(isEdit);
  }

  submitForm() {
    console.log(this.currentActivity);
  }

  private initializeForm(activity: IActivity): IActivity {
    if (!activity) {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
      };
    }
    return activity;
  }

  private setActivity(inputEl: HTMLInputElement | HTMLTextAreaElement) {
    const { name, value } = inputEl;
    this.currentActivity = {
      ...this.currentActivity,
      [name]: value,
    };
  }
}

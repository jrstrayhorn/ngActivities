import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css'],
})
export class ActivityFormComponent implements OnInit {
  @Output() changedEditMode = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  setEditMode(isEdit: boolean) {
    this.changedEditMode.emit(isEdit);
  }
}

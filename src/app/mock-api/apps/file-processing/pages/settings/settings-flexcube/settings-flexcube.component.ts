import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-flexcube',
  templateUrl: './settings-flexcube.component.html',
  styleUrls: ['./settings-flexcube.component.scss']
})
export class SettingsFlexcubeComponent implements OnInit {

  settingsForm: FormGroup
  constructor() { }

  ngOnInit(): void {
  }
  onSave(): any {
  }
}

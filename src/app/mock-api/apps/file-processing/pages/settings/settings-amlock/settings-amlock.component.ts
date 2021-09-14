import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-amlock',
  templateUrl: './settings-amlock.component.html',
  styleUrls: ['./settings-amlock.component.scss']
})
export class SettingsAmlockComponent implements OnInit {
  settingsForm: FormGroup

  constructor() { }

  ngOnInit(): void {
  }
  onSave(): any {
  }
  

}

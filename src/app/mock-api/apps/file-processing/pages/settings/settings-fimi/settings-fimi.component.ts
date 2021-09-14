import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-fimi',
  templateUrl: './settings-fimi.component.html',
  styleUrls: ['./settings-fimi.component.scss']
})
export class SettingsFimiComponent implements OnInit {
  settingsForm: FormGroup
  constructor() { }

  ngOnInit(): void {
  }
  onSave(): any {
  }

}

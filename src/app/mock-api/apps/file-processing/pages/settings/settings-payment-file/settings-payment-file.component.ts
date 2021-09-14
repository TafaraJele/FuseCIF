import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-payment-file',
  templateUrl: './settings-payment-file.component.html',
  styleUrls: ['./settings-payment-file.component.scss']
})
export class SettingsPaymentFileComponent implements OnInit {

  settingsForm: FormGroup
  constructor() { }

  ngOnInit(): void {
  }
  onSave(): any {
  }

}

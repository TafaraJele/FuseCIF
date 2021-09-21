import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'app/mock-api/store';
import { CIFConfiguration } from 'app/shared/models/cif-configuration.model';
import { NotificationsService } from 'app/shared/notifications/notifications.service';
import { FileService } from '../../../services/files.service';

@Component({
  selector: 'app-settings-cif',
  templateUrl: './settings-cif.component.html',
  styleUrls: ['./settings-cif.component.scss']
})
export class SettingsCifComponent implements OnInit {

  settings: CIFConfiguration
  settingsForm: FormGroup
  showMsg: boolean = false
 
  constructor(
    private formBuilder: FormBuilder,
    private service: FileService,
    private notifyService : NotificationsService) {
    this.settings = new CIFConfiguration
    this.settingsForm = this.formBuilder.group({
      'matchMinValue': [''],
      'cardChargeFee': [''],
      'accountPrefix': [''],      
      'flexCubeWebServiceUri':[''],
      'sFTPPaymentFilePath':[''],
      'branch':[''],
      'cardIssueDebitAccountNumber': [''],
      'cardIssueCreditAccountNumber': [''],
      'cardFundingDebitAccountNumber': [''],
      'cardFundingCreditAccountNumber': [''],
      'cardDefundingDebitAccountNumber': [''],
      'cardDefundingCreditAccountNumber': [''],
      
    })
  }

  ngOnInit(): void {
    
    this.service.loadSettings().subscribe(settings => {
      if (settings) {

        this.settings = settings
        this.patchForm()
      }
    })
  }

  patchForm(): any {    
    
    this.settingsForm.patchValue({
      matchMinValue: this.settings.matchMinValue,
      cardChargeFee: this.settings.cardChargeFee,
      accountPrefix: this.settings.accountPrefix,      
      flexCubeWebServiceUri: this.settings.flexCubeWebServiceUri,
      sFTPPaymentFilePath: this.settings.sftpPaymentFilePath,
      branch: this.settings.branch,
      cardIssueDebitAccountNumber: this.settings.cardIssueDebitAccountNumber,
      cardIssueCreditAccountNumber: this.settings.cardIssueCreditAccountNumber,
      cardFundingDebitAccountNumber: this.settings.cardFundingDebitAccountNumber,
      cardFundingCreditAccountNumber: this.settings.cardFundingCreditAccountNumber,
      cardDefundingDebitAccountNumber: this.settings.cardDefundingDebitAccountNumber,
      cardDefundingCreditAccountNumber: this.settings.cardDefundingCreditAccountNumber,
    })
  }

  onSave(): any {

    this.settings = { ... this.settings }
    this.settings.matchMinValue = '' + this.settingsForm.value['matchMinValue']
    this.settings.cardChargeFee = '' + this.settingsForm.value['cardChargeFee']
    this.settings.accountPrefix = this.settingsForm.value['accountPrefix']    
    this.settings.flexCubeWebServiceUri = this.settingsForm.value['flexCubeWebServiceUri']
    this.settings.sftpPaymentFilePath = this.settingsForm.value['sFTPPaymentFilePath']
    this.settings.branch = this.settingsForm.value['branch']
    this.settings.cardIssueDebitAccountNumber = this.settingsForm.value['cardIssueDebitAccountNumber']
    this.settings.cardIssueCreditAccountNumber = this.settingsForm.value['cardIssueCreditAccountNumber']
    this.settings.cardFundingDebitAccountNumber = this.settingsForm.value['cardFundingDebitAccountNumber']
    this.settings.cardFundingCreditAccountNumber = this.settingsForm.value['cardFundingCreditAccountNumber']
    this.settings.cardDefundingDebitAccountNumber = this.settingsForm.value['cardDefundingDebitAccountNumber']
    this.settings.cardDefundingCreditAccountNumber = this.settingsForm.value['cardDefundingCreditAccountNumber']
   

    this.service.addSettings(this.settings).subscribe(res => {

      this.notifyService.showNotification('notifications','Settings are being saved','')
      if (res.accepted) {
        this.notifyService.showNotification('success','Settings successfully saved','OK')
      }
      else{
        this.notifyService.showNotification('error','Something went wrong','OK')
      }
    })
  }

}

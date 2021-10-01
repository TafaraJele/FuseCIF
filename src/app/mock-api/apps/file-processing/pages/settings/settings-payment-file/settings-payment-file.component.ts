import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PaymentFileConfiguration } from 'app/shared/models/payment-file-config';
import { NotificationsService } from 'app/shared/notifications/notifications.service';
import { FileService } from '../../../services/files.service';

@Component({
  selector: 'app-settings-payment-file',
  templateUrl: './settings-payment-file.component.html',
  styleUrls: ['./settings-payment-file.component.scss']
})
export class SettingsPaymentFileComponent implements OnInit {

 
  allsettings:PaymentFileConfiguration[] = []
  filteredSettings:PaymentFileConfiguration[] = []
  settings: PaymentFileConfiguration
  settingsForm: FormGroup 
  showMsg: boolean = false
  showForm: boolean
  showCreate: boolean
  showSave:boolean
  productName: string
 
  constructor(
    private formBuilder: FormBuilder,
    private service: FileService,
    private notifyService : NotificationsService) {
    this.settings = new PaymentFileConfiguration
    // this.settingsForm = new FormGroup({
    //   productName: new FormControl('')


    // }
     


    // )
    this.setFormIntialValues("")
   
  }

  ngOnInit(): void {
    this.showForm = false
    this.showSave = false
    this.showCreate = false
    this.setFormIntialValues("")
    this.loadSettings()
  }

  patchForm(): any {    
    
    this.settingsForm.patchValue({     
      fundingReversalIndicator: this.settings.fundingReversalIndicator,
      defundingReversalIndicator: this.settings.defundingReversalIndicator,
      reference: this.settings.reference,      
      cardBillingCurrency: this.settings.cardBillingCurrency,
      reasonCode: this.settings.reasonCode,
      debitDetailRecordRecordType: this.settings.debitDetailRecordRecordType,
      trailerRecordRecordType: this.settings.trailerRecordRecordType,
      paymentIndicator: this.settings.paymentIndicator,
      fileName: this.settings.fileName,
      
    })
  }

  onSave(): any {

    this.settings = { ... this.settings }
    this.settings.productName = this.productName
    this.settings.fundingReversalIndicator = '' + this.settingsForm.value['fundingReversalIndicator']
    this.settings.defundingReversalIndicator = '' + this.settingsForm.value['defundingReversalIndicator']
    this.settings.reference = this.settingsForm.value['reference']    
    this.settings.cardBillingCurrency = this.settingsForm.value['cardBillingCurrency']
    this.settings.reasonCode = this.settingsForm.value['reasonCode']
    this.settings.debitDetailRecordRecordType = this.settingsForm.value['debitDetailRecordRecordType']
    this.settings.trailerRecordRecordType = this.settingsForm.value['trailerRecordRecordType']
    this.settings.paymentIndicator = this.settingsForm.value['paymentIndicator']
    this.settings.fileName = this.settingsForm.value['fileName']   
   

    this.service.addPaymentFileSettings(this.settings).subscribe(res => {

      this.notifyService.showNotification('notifications','Settings are being saved','')
      if (res.accepted) {
        debugger
        this.filteredSettings = res.resource
        this.notifyService.showNotification('success','Settings successfully saved','OK')
        this.loadSettings()
       
      }
      else{
        this.notifyService.showNotification('error','Something went wrong','OK')
      }
    })
  }

  ShowSettingsForm(productName: string){

    this.loadSettings()
    debugger
    if(productName === "MASTERCARD_PREPAID"){
     
      this.setproductNameForm(productName)

    }
    if(productName ==="VISA_GOG_PREPAID"){
     
      this.setproductNameForm(productName)     

    }

  }

  setFormIntialValues(productName:string){
    this.settingsForm = this.formBuilder.group({
      'productName':[productName],
      'fundingReversalIndicator': [''],
      'defundingReversalIndicator': [''],
      'reference': [''],      
      'cardBillingCurrency':[''],
      'reasonCode':[''],
      'debitDetailRecordRecordType':[''],
      'trailerRecordRecordType': [''],
      'paymentIndicator': [''],
      'fileName': ['']      
      
    })
  }

 prepopulateFormValues(productName:string){
    this.settingsForm = this.formBuilder.group({
      'productName':[productName],
      'fundingReversalIndicator': [this.settings.fundingReversalIndicator],
      'defundingReversalIndicator': [this.settings.defundingReversalIndicator],
      'reference': [this.settings.reference],      
      'cardBillingCurrency':[this.settings.cardBillingCurrency],
      'reasonCode':[this.settings.reasonCode],
      'debitDetailRecordRecordType':[this.settings.debitDetailRecordRecordType],
      'trailerRecordRecordType': [this.settings.trailerRecordRecordType],
      'paymentIndicator': [this.settings.paymentIndicator],
      'fileName': [this.settings.fileName],
      
      
    })
  }

  setproductNameForm(productName: string){
    this.showForm = true
    this.showSave = true
      this.productName = productName

      if(this.allsettings && this.allsettings.length > 0){
        debugger
        this.filteredSettings = this.allsettings.filter(c => c.productName === productName)
        this.settings = this.filteredSettings[0]

        if( this.filteredSettings.length > 0 ){

          this.prepopulateFormValues(productName)
        } 
        else{

          this.setFormIntialValues(productName)
          
        }  
      }
      else{

        this.setFormIntialValues(productName)
      }     

  }

  loadSettings(){
       this.service.getPaymentFileSettings().subscribe(settings => {

      if (settings) {
        this.allsettings = settings       
      }
    })
  }

}

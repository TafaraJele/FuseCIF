import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/mock-api/store';
import { FundRequest } from 'app/shared/models/fundrequest.model';
import { NotificationsService } from 'app/shared/notifications/notifications.service';
import { FileService } from '../../services/files.service';
import { approveFundOrDefund, loadFileAccounts, loadFileFundRequests } from '../../store/actions/files.actions';
import { selectFile } from '../../store/selectors/files.selector';



@Component({
  selector: 'app-file-fundload',
  templateUrl: './file-fundload.component.html',
  styleUrls: ['./file-fundload.component.scss']
})
export class FileFundloadComponent implements OnInit {
  @Input() file: any
  fundrequests: FundRequest[] = []  
  filteredFundRequests: FundRequest[] = []
  successfulFundRequests: FundRequest[] = []
  errorsFundRequests: FundRequest[] = []  
  fileId: any 
  showResubmit = false
  activeKey = 0
  showMsg = false
  successPageSlice: any[] = []
  errorPageSlice: any[] = []
  showApprove: boolean 
  batchNumber: any
  message:string

  constructor(private store: Store<AppState>,
    private service: FileService,
    private notifyService : NotificationsService) {

    if (this.file) {
      this.refreshSuccessFundRequests()
      this.refreshErrorFundRequests()
    }
    this.message = ""


  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes.file) {
      this.file = changes.file.currentValue;

      if (this.file) {
        this.batchNumber = this.file.batchNumber;

      }
    }

  }

  ngOnInit(): void {

    this.showMsg = false
    this.refreshSuccessFundRequests()
    this.refreshErrorFundRequests()
    if(this.file.status == "Received"){
      this.showApprove = true
    }

  } 

  OnPageChange(event: PageEvent) {

    const startIndex = event.pageIndex * event.pageSize;

    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.fundrequests.length) {
      endIndex = this.fundrequests.length;
    }
    this.successPageSlice = this.successfulFundRequests.slice(startIndex, endIndex)
    this.errorPageSlice = this.errorsFundRequests.slice(startIndex, endIndex)

  }

  refreshSuccessFundRequests() {
    this.service.loadFileFundRequests(this.file.batchNumber).subscribe(fundrequests => {

      this.fundrequests = fundrequests

      if (this.fundrequests && this.fundrequests.length > 0) {
        this.successfulFundRequests = this.fundrequests.filter(c => c.status === "ChargeSuccess" || c.status === "Received")
        this.errorsFundRequests = this.fundrequests.filter(c => c.status === "Error")

      }
      this.filteredFundRequests = this.successfulFundRequests
      this.successPageSlice = this.successfulFundRequests.slice(0, 5)
      this.errorPageSlice = this.errorsFundRequests.slice(0, 5)

    })

  }
  refreshErrorFundRequests() {
    this.service.loadFileFundRequests(this.file.batchNumber).subscribe(fundrequests => {

      this.fundrequests = fundrequests

      if (this.fundrequests && this.fundrequests.length > 0) {
        this.successfulFundRequests = this.fundrequests.filter(c => c.status === "ChargeSuccess" || c.status === "Received")
        this.errorsFundRequests = this.fundrequests.filter(c => c.status === "Error")

      }
      if(this.errorsFundRequests && this.errorsFundRequests.length > 0 ){
        this.showResubmit = true
        this.showApprove = false
      }
      else{
        this.showResubmit = false
      }
      this.filteredFundRequests = this.errorsFundRequests
      this.successPageSlice = this.successfulFundRequests.slice(0, 5)
      this.errorPageSlice = this.errorsFundRequests.slice(0, 5)

    })

  }
  onApprove() {
    this.showApprove = false
    this.notifyService.showNotification('notification', 'Fund load is being approved. Please wait', '') 
    this.service.approveFundOrDefund(this.file).subscribe(response => {
      this.refreshSuccessFundRequests()
      this.refreshErrorFundRequests()

      if (response.accepted) {        
        this.file = response.resource
        this.notifyService.showNotification('success', 'Fund load approved sucessfully', 'OK')        
      }
      else{
        this.notifyService.showNotification('error', 'Fund load failed', 'OK')

      }      

    })

  }
  
  viewSuccess(): any {
    this.showMsg = false
    this.showResubmit = false
    this.activeKey = 0
    this.refreshSuccessFundRequests()

  }
  onResubmit(): any {
    
    this.showResubmit = false
    this.notifyService.showNotification('notification', 'Funds load is being submitted!!!','')

    if (this.file.batchNumber) {

      this.service.approveFundOrDefund(this.file).subscribe(response => {

        if (response) {
          this.refreshErrorFundRequests()
          if (response.accepted) {
            this.notifyService.showNotification('success', 'Funds load submitted successfully!!!','OK')
           
          }
          else{
            this.notifyService.showNotification('error', 'Something went wrong!!!','OK')

          }

        }

      })
    }

  }
  viewErrors(): any {

    this.activeKey = 1
    this.refreshErrorFundRequests()
    if (this.errorsFundRequests.length > 0) {
      this.showResubmit = true

    }

  }
  changeKey(key) {
    this.activeKey = key
  }
  exportToCsv(filter): any {
    let name = 'fundrequests.csv'
    let filteredFundRequests = this.fundrequests
    if (filter) {
      name = filter + name + '.csv'
      filteredFundRequests = this.fundrequests.filter(a => a.status.toLowerCase() === filter.toLowerCase())
    }
    this.service.exportToCsv(name, filteredFundRequests)
  }

}

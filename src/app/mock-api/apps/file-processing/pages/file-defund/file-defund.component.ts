import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/mock-api/store';
import { FundRequest } from 'app/shared/models/fundrequest.model';
import { NotificationsService } from 'app/shared/notifications/notifications.service';
import { FileService } from '../../services/files.service';
import { approveFundOrDefund, loadFileAccounts, loadFileDefundRequests } from '../../store/actions/files.actions';
import { selectFile } from '../../store/selectors/files.selector';
import { FilePageManagerComponent } from '../file-page-manager/file-page-manager.component';

@Component({
  selector: 'app-file-defund',
  templateUrl: './file-defund.component.html',
  styleUrls: ['./file-defund.component.scss']
})
export class FileDefundComponent implements OnInit {
  @Input() file: any
  fileId: any
  defundrequests: FundRequest[] = []  
  filteredDefundRequests: FundRequest[] = []
  successfulDefundRequests: FundRequest[] = []
  errorsDefundRequests: FundRequest[] = [] 
  showResubmit = false
  activeKey = 0
  showMsg = false
  message: string  
  successPageSlice: any[] = []
  errorPageSlice: any[] = []
  showApprove: boolean    
  batchNumber: any

  constructor(private store: Store<AppState>,
    private service: FileService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationsService) {

    this.activatedroute.params.subscribe(
      params => {
        this.fileId = params['id']
        this.loadFile()
        if (this.file) {

          this.store.dispatch(loadFileAccounts({ fileBatchNumber: this.file.batchNumber }))

          this.message = ""
        }
      }
    )
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
    this.refreshSuccessDefundRequests()
    this.refreshErrorDefundRequests()
    if (this.file.status == "Received") {
      this.showApprove = true
    }

  } 
 
  loadFile(): any {

    if (this.fileId) {
      this.store.pipe(select(selectFile(this.fileId))).subscribe(file => {

        if (file) {
          this.file = file

        }
      })
    }
  }
  ViewFileDetails(file): any {
    this.service.changeMessage(file)
    var fileManagers = new FilePageManagerComponent(this.service)
    fileManagers.ngOnInit()
    this.router.navigate(['/file-manager/files', file.id]);

  }
  onApprove() {
    this.showApprove = false
    this.notifyService.showNotification('notification', 'Fund load is being approved. Please wait', '')
    this.service.approveFundOrDefund(this.file).subscribe(response => {
      this.file = response.resource
      if (response.accepted) {

        this.refreshSuccessDefundRequests()
        this.refreshErrorDefundRequests()
        this.notifyService.showNotification('success', 'Funds load approved successfully!!!', 'OK')

      }
      else {
        this.notifyService.showNotification('error', 'Something went wrong!!!', 'OK')

      }

    })

  }

  refreshSuccessDefundRequests() {
    this.service.loadFileDeFundRequests(this.file.batchNumber).subscribe(defundrequests => {

      this.defundrequests = defundrequests

      if (this.defundrequests && this.defundrequests.length > 0) {
        this.successfulDefundRequests = this.defundrequests.filter(c => c.status === "ChargeSuccess" || c.status === "Received")
        this.errorsDefundRequests = this.defundrequests.filter(c => c.status === "Error")

      }
      this.filteredDefundRequests = this.successfulDefundRequests
      this.successPageSlice = this.successfulDefundRequests.slice(0, 5)
      this.errorPageSlice = this.errorsDefundRequests.slice(0, 5)

    })

  }
  refreshErrorDefundRequests() {
    this.service.loadFileDeFundRequests(this.file.batchNumber).subscribe(defundrequests => {

      this.defundrequests = defundrequests

      if (this.defundrequests && this.defundrequests.length > 0) {
        this.successfulDefundRequests = this.defundrequests.filter(c => c.status === "ChargeSuccess" || c.status === "Received")
        this.errorsDefundRequests = this.defundrequests.filter(c => c.status === "Error")

      }

      this.filteredDefundRequests = this.errorsDefundRequests
      this.successPageSlice = this.successfulDefundRequests.slice(0, 5)
      this.errorPageSlice = this.errorsDefundRequests.slice(0, 5)
      if (this.errorsDefundRequests.length > 0) {
        this.showResubmit = true
        this.showApprove = false

      }
      else {

        this.showResubmit = false
      }

    })


  }
  OnPageChange(event: PageEvent) {

    const startIndex = event.pageIndex * event.pageSize;

    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.defundrequests.length) {
      endIndex = this.defundrequests.length;
    }
    this.successPageSlice = this.successfulDefundRequests.slice(startIndex, endIndex)
    this.errorPageSlice = this.errorsDefundRequests.slice(startIndex, endIndex)

  }

  viewSuccess(): any {
    this.showResubmit = false
    this.showMsg = false
    this.activeKey = 0
    this.refreshSuccessDefundRequests()
  }
  viewErrors(): any {
    this.activeKey = 1
    this.showMsg = false
    this.refreshErrorDefundRequests()

    if (this.errorsDefundRequests.length > 0) {
      this.showResubmit = true
    }

  }
  onResubmit(): any {
    this.notifyService.showNotification('notification', 'Funds load is being submitted!!!', '')

    if (this.file.batchNumber) {

      this.service.approveFundOrDefund(this.file).subscribe(response => {

        if (response) {

          this.refreshErrorDefundRequests()
          if (response.accepted) {
            this.notifyService.showNotification('success', 'Funds load submitted successfully!!!', 'OK')

          }
          else {
            this.notifyService.showNotification('error', 'Something went wrong!!!', 'OK')

          }

        }


      })
    }

  }

  changeKey(key) {
    this.activeKey = key
  }
  exportToCsv(filter): any {
    let name = 'defundrequests.csv'
    let filteredDefundRequests = this.defundrequests
    if (filter) {
      name = filter + name + '.csv'
      filteredDefundRequests = this.defundrequests.filter(a => a.status.toLowerCase() === filter.toLowerCase())
    }
    this.service.exportToCsv(name, filteredDefundRequests)
  }


}

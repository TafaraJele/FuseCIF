import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { select, Store } from '@ngrx/store';
import { FileService } from 'app/mock-api/apps/file-processing/services/files.service';
import { approveFundOrDefund } from 'app/mock-api/apps/file-processing/store/actions/files.actions';
import { selectFiles } from 'app/mock-api/apps/file-processing/store/selectors/files.selector';
import { AppState } from 'app/mock-api/store';
import { FileMetadata } from 'app/shared/models/filemetadata.model';
import { UploadErrorResponse } from 'app/shared/models/upload-error-response';
import { UploadResponse } from 'app/shared/models/upload-reponse';
import { FilePageManagerComponent } from '../../../file-page-manager/file-page-manager.component';
import { UploadResponsesComponent } from '../../upload-responses/upload-responses/upload-responses.component';

@Component({
  selector: 'app-mastercard-funding',
  templateUrl: './mastercard-funding.component.html',
  styleUrls: ['./mastercard-funding.component.scss']
})

export class MastercardFundingComponent implements OnInit {
  files: FileMetadata[] = []
  filteredFiles: FileMetadata[] = []
  showMsg: boolean = false
  activeKey = 0
  approvedFiles: FileMetadata[] = []
  receivedFiles: FileMetadata[] = []
  approvedPageSlice: any[] = []
  receivedPageSlice: any[] = []
  uploadResponse: UploadResponse
  uploadErrorResponse: UploadErrorResponse[] = []
  fileName = ''
  @ViewChild('fileUpload') fileUpload;
  
  dialogRef: MatDialogRef<FuseConfirmationDialogComponent, any>
  

  //get date and month search parameter from template
  private _searchMonthDate: string
  get searchMonthDate(): string { return this._searchMonthDate }
  set searchMonthDate(value: string) {
    this._searchMonthDate = value;
    this.filterFiles("", value);
  }

  //get file reference search parameter from template
  private _seachParameter: string
  get seachParameter(): string { return this._seachParameter }
  set seachParameter(value: string) {
    this._seachParameter = value;
    this.filterFiles(value, "");
  }

  constructor(private _fuseConfirmationService: FuseConfirmationService,
    private service: FileService, private router: Router, public datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.LoadFiles()
  }

  LoadFiles() {
    this.service.loadFidelityFiles().subscribe(files => {
      if (files) {
        this.FilterByFileStatus(files)
        this.SortFilesByDateDescending(this.approvedPageSlice)
        this.SortFilesByDateDescending(this.receivedPageSlice)
      }
    })
  }

  //sort files by descending order to show the most recent files first
  SortFilesByDateDescending(array: any) {

    array.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  //filter by file status approved or received
  FilterByFileStatus(files: any) {
    this.files = files.filter(c => c.requestType == 'cardfunding')
    this.approvedFiles = this.files.filter(c => c.status == 'Approved')
    this.receivedFiles = this.files.filter(c => c.status == 'Received')
    this.filteredFiles = this.receivedFiles

    //set page slice to filtered files. page slices is used in the pages on ngFor            
    this.approvedPageSlice = this.approvedFiles.slice(0, 5)
    this.receivedPageSlice = this.receivedFiles.slice(0, 5)
  }

  //when the pagination is changed on page changes the page slice data
  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;

    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.files.length) {
      endIndex = this.files.length;
    }
    this.approvedPageSlice = this.approvedFiles.slice(startIndex, endIndex)
    this.receivedPageSlice = this.receivedFiles.slice(startIndex, endIndex)

  }

  //filter files by search parameters
  filterFiles(value: string, monthDate: string) {
    if (value != "") {
      //filter by file reference
      this.filteredFiles = this.files.filter(c => c.fileReference.toLowerCase().indexOf(value.toLowerCase()) !== -1)
      this.receivedPageSlice = this.filteredFiles.slice(0, 5)
      this.approvedPageSlice = this.filteredFiles.slice(0, 5)
    }
    else if (monthDate != "") {
      //convert each files's date to string and to short date format for filtering
      this.files.forEach((file) => {

        const metadata = { ...file }
        let date = this.datePipe.transform(metadata.date)
        file.searchDate = date
      })
      //filter by date
      this.filteredFiles = this.files.filter(c => c.searchDate.toLowerCase().indexOf(monthDate.toLowerCase()) !== -1)
      this.receivedPageSlice = this.filteredFiles.slice(0, 5)
      this.approvedPageSlice = this.filteredFiles.slice(0, 5)
    }
    else {
      //else set files to default files
      this.receivedPageSlice = this.receivedFiles.slice(0, 5)
      this.approvedPageSlice = this.approvedFiles.slice(0, 5)
    }

  }

  //navigate to file-manager when view file details is called
  ViewFileDetails(file): any {

    this.service.changeMessage(file)
    var fileManagers = new FilePageManagerComponent(this.service)
    fileManagers.ngOnInit()
    this.router.navigate(['/file-manager/files', file.id]);

  }

  //upload files
  UploadFundRequestFile(event) {
    
    this.ShowMessage("File is being uploaded. Please wait!!!", "Notification", "", "primary")
    debugger
    this.LoadFiles()
    var file = event.target.files[0];
    if (file) {
      this.fileName = file.name
      const formData: FormData = new FormData();
      formData.append('FileContent', file, file.name)

      this.service.UploadFile(formData).subscribe(response => {

        if (response) {
          this.uploadResponse = response
          this.service.changeResponse(this.uploadResponse)
          this.dialogRef.close()          
          this.ShowMessage("File reference number:" + response.fileReferenceNumber, response.message + "!!!", "File batch number:" + response.batchNumber, "success")
          this.LoadFiles()
        }
      },
        httpErrorResponse => {

          var message = ""
          if (httpErrorResponse.status == 500) {
            message = httpErrorResponse.error
          }
          else if (httpErrorResponse.status == 0) {
            message = httpErrorResponse.message
          }
          else {
            this.uploadErrorResponse = httpErrorResponse.error
            message = this.uploadErrorResponse[0].message
          }
          this.dialogRef.close()         
          this.ShowMessage(message, "Error!!!", "", "warn")
        }

      )
      this.fileUpload.nativeElement.value = ""

    }
  }

  //download csv file of the selected filter
  exportToCsv(filter): any {
    let name = 'fdelitymastercardfunding.csv'
    let filteredFiles = this.files
    if (filter) {
      name = filter + name + '.csv'
      filteredFiles = this.files.filter(a => a.status.toLowerCase() === filter.toLowerCase())
    }
    this.service.exportToCsv(name, filteredFiles)
  }

  //dispaly error and success messages
  ShowMessage(message: string, title: string, subtitle: string, color?: 'primary' | 'accent' | 'warn' | 'success' ) {

    this.dialogRef = this._fuseConfirmationService.open(

      {
        "title": title,
        "subtitle": subtitle,
        "message": message,
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": color
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "OK",
            "color": color
          },
          "cancel": {
            "show": false,
            "label": 'Cancel'
          }

        },

        "dismissible": true
      }

    );

  }

}

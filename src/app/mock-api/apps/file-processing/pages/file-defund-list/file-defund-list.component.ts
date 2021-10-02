import { Component, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { approveFundOrDefund, loadFileDefundRequests, approveFile } from '../../store/actions/files.actions';
import { FileService } from '../../services/files.service';
import { FileMetadata } from 'app/shared/models/filemetadata.model';
import { AppState } from 'app/mock-api/store';
import { PageEvent } from '@angular/material/paginator';
import { FilePageManagerComponent } from '../file-page-manager/file-page-manager.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-file-defund-list',
  templateUrl: './file-defund-list.component.html',
  styleUrls: ['./file-defund-list.component.scss']
})
export class FileDefundListComponent implements OnInit {
  files: FileMetadata[] = []  
  filteredFiles: FileMetadata[]  = [] 
  showMsg: boolean = false
  activeKey = 0
  approvedFiles: FileMetadata[]  = []
  receivedFiles: FileMetadata[]  = []
  approvedPageSlice : any[]  = []
  receivedPageSlice: any[]  = []

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
  
  constructor(
    private service: FileService, private router: Router, public datePipe: DatePipe) {
  }

  ngOnInit(): void {    
    this.LoadFiles()    
  }
  //load files service and filter files by request type
  LoadFiles(){
    this.service.loadFiles().subscribe(files => {
      if (files) {        
        this.FilterByFileStatus(files)        
        this.SortFilesByDateDescending(this.approvedPageSlice)
        this.SortFilesByDateDescending(this.receivedPageSlice)       

      }
    })  
  } 
  //sort files by descending order to show the most recent files first
  SortFilesByDateDescending(array: any){
   
    array.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return  dateB.getTime() - dateA.getTime() ;
    });
  }

   //filter by file status approved or received
   FilterByFileStatus(files: any){
    this.files = files.filter(c => c.requestType == 'carddefunding')
        this.approvedFiles = this.files.filter(c => c.status == 'Approved')
        this.receivedFiles = this.files.filter(c => c.status == 'Received') 
        this.filteredFiles = this.receivedFiles

        //set page slice to filtered files. page slices is used in the pages on ngFor            
        this.approvedPageSlice = this.approvedFiles.slice(0, 5)
        this.receivedPageSlice = this.receivedFiles.slice(0, 5)
  }
  //navigate to file-manager when view file details is called
  ViewFileDetails(file):any{
   
    this.service.changeMessage(file)
    var fileManagers = new FilePageManagerComponent(this.service)
    fileManagers.ngOnInit()
    this.router.navigate(['/file-manager/files',file.id]);

  }
  
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
    //download csv file of the selected filter
  exportToCsv(filter): any {
    let name = 'defundrequestsfiles.csv'
    let filteredFiles = this.files
    if (filter) {
      name = filter + name +'.csv'
      filteredFiles = this.files.filter(a => a.status.toLowerCase() === filter.toLowerCase())
    }
    this.service.exportToCsv(name, filteredFiles)
  }
  
}

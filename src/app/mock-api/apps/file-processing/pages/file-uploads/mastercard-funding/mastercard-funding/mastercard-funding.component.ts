import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { FileService } from 'app/mock-api/apps/file-processing/services/files.service';
import { approveFundOrDefund } from 'app/mock-api/apps/file-processing/store/actions/files.actions';
import { selectFiles } from 'app/mock-api/apps/file-processing/store/selectors/files.selector';
import { AppState } from 'app/mock-api/store';
import { FileMetadata } from 'app/shared/models/filemetadata.model';
import { UploadResponse } from 'app/shared/models/upload-reponse';
import { FilePageManagerComponent } from '../../../file-page-manager/file-page-manager.component';
import { UploadResponsesComponent } from '../../upload-responses/upload-responses/upload-responses.component';

@Component({
  selector: 'app-mastercard-funding',
  templateUrl: './mastercard-funding.component.html',
  styleUrls: ['./mastercard-funding.component.scss']
})
export class MastercardFundingComponent implements OnInit {
  files: FileMetadata[]  =[]
  isSidebarOpen: boolean
  filteredFiles: FileMetadata[]  =[]
  listOfSearchName: string[] = []
  listOfSearchAddress: string[] = []
  showMsg: boolean = false
  activeKey = 0
  approvedFiles: FileMetadata[] =[]
  receivedFiles: FileMetadata[] =[]
  approvedPageSlice: any[] =[]
  receivedPageSlice: any[] =[]
  searchInputControl: FormControl = new FormControl();
  uploadResponse: UploadResponse

  mapOfSort: { [key: string]: any } = {
    file: null,
    batchNumber: null,
    status: null,
    fileReference: null,
    timeSaved: null
  }
  sortName: string | null = null
  sortValue: string | null = null
  constructor(private store: Store<AppState>,
    private service: FileService, private router: Router, private fileManager: FilePageManagerComponent,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    
    this.service.loadFidelityFiles().subscribe(files => {
      
      if (files) {
        
        this.files = files.filter(c => c.requestType == 'cardfunding')
        this.approvedFiles = this.files.filter(c => c.status == 'Approved')
        this.receivedFiles = this.files.filter(c => c.status == 'Received') 
        this.filteredFiles = this.receivedFiles            
        this.approvedPageSlice = this.approvedFiles.slice(0, 5) 
        this.receivedPageSlice = this.receivedFiles.slice(0, 5) 

      }
    })
    this.store.pipe(select(selectFiles())).subscribe(files => {
  
      if (files) {        
        this.files = files.filter(c => c.requestType == 'cardfunding')
        this.approvedFiles = this.files.filter(c => c.status == 'Approved')
        this.receivedFiles = this.files.filter(c => c.status == 'Received') 
        this.filteredFiles = this.receivedFiles       
      }
    })

   
  }
  sort(sortName: string, value: string): void {
    this.sortName = sortName
    this.sortValue = value
    for (const key in this.mapOfSort) {
      if (this.mapOfSort.hasOwnProperty(key)) {
        this.mapOfSort[key] = key === sortName ? value : null
      }
    }
    this.search(this.listOfSearchName, this.listOfSearchAddress)
  }

  search(listOfSearchName: string[], listOfSearchAddress: string[]): void {
    this.listOfSearchName = listOfSearchName
    this.listOfSearchAddress = listOfSearchAddress
    const filterFunc = item =>
      (this.listOfSearchAddress.length
        ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
        : true) &&
      (this.listOfSearchName.length
        ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1)
        : true)
    const listOfData = this.files.filter(item => filterFunc(item))
    if (this.sortName !== null && this.sortValue !== null) {
      this.filteredFiles = listOfData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
            ? 1
            : -1,
      )
    } else {
      this.filteredFiles = this.files
    }
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
  ViewFileDetails(file):any{

    this.service.changeMessage(file)
    var fileManagers = new FilePageManagerComponent(this.service)
    fileManagers.ngOnInit()
    this.router.navigate(['/file-manager/files',file.id]);

  }

  UploadFundRequestFile(event){
debugger
    var file = event.target.files[0];
    const formData : FormData = new FormData();
    formData.append('FileContent',file,file.name)

this.service.UploadFile(formData).subscribe( response =>{
  debugger
  if(response){
    this.uploadResponse = response
debugger
    let dialogRef = this.dialog.open(UploadResponsesComponent, {
      height: '400px',
      width: '600px',
    });
  }
})
this.service.loadFidelityFiles().subscribe(files => {
      
  if (files) {
    
    this.files = files.filter(c => c.requestType == 'cardfunding')
    this.approvedFiles = this.files.filter(c => c.status == 'Approved')
    this.receivedFiles = this.files.filter(c => c.status == 'Received') 
    this.filteredFiles = this.receivedFiles            
    this.approvedPageSlice = this.approvedFiles.slice(0, 5) 
    this.receivedPageSlice = this.receivedFiles.slice(0, 5) 

  }
})

  }
  viewApproved(){
    this.filteredFiles = this.approvedFiles
  }
  viewReceived(){
    this.filteredFiles = this.receivedFiles
  }
 
  onApprove(file): any {
    
    this.files.forEach((file) => {
      
        const metadata = { ...file }
        metadata.status = 'Loading'  
    
    })
    

      const metadata = { ...file }
      metadata.status = 'Approved'
      this.showMsg = true

      this.store.dispatch(approveFundOrDefund({ file: metadata }))
      
    setTimeout(() => {
      this.showMsg = false
    }, 2000)
  }
  exportToCsv(filter): any {
    let name = 'fundrequestsfiles.csv'
    let filteredFiles = this.files
    if (filter) {
      name = filter + name + '.csv'
      filteredFiles = this.files.filter(a => a.status.toLowerCase() === filter.toLowerCase())
    }
    this.service.exportToCsv(name, filteredFiles)
  }
}
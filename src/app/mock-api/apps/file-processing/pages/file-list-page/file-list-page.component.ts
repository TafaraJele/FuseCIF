import { Component, OnInit, ViewChild } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/mock-api/store';
import { FileMetadata } from 'app/shared/models/filemetadata.model';
import { FileService } from '../../services/files.service';
import { approveFile, approveFundOrDefund, loadFileDefundRequests } from '../../store/actions/files.actions';
import { selectFiles } from '../../store/selectors/files.selector';
import * as UserActions from 'app/mock-api/store/user/actions';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { FilePageManagerComponent } from '../file-page-manager/file-page-manager.component';
import { FileProcessingModule } from '../file-processing/file-processing.module';
import { Router } from '@angular/router';
import { NotificationsService } from 'app/shared/notifications/notifications.service';

@Component({
  selector: 'app-file-list-page',
  templateUrl: './file-list-page.component.html',
  styleUrls: ['./file-list-page.component.scss']
})
export class FileListPageComponent implements OnInit {
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
    private service: FileService, private router: Router, private fileManager: FilePageManagerComponent) {
  }
  ngOnInit(): void {
    
    // this.store.dispatch(new UserActions.LoadFiles())
    this.service.loadFiles().subscribe(files => {
      
      if (files) {

        this.files = files.filter(c => c.requestType == 'cardrequest')
        this.approvedFiles = this.files.filter(c => c.status == 'Approved')
        this.receivedFiles = this.files.filter(c => c.status == 'Received') 
        this.filteredFiles = this.receivedFiles            
        this.approvedPageSlice = this.approvedFiles.slice(0, 5) 
        this.receivedPageSlice = this.receivedFiles.slice(0, 5) 

      }
    })
    this.store.pipe(select(selectFiles())).subscribe(files => {
  
      if (files) {
        
        this.files = files.filter(c => c.requestType == 'cardrequest')
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

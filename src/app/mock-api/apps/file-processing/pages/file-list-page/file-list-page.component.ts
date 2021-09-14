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

@Component({
  selector: 'app-file-list-page',
  templateUrl: './file-list-page.component.html',
  styleUrls: ['./file-list-page.component.scss']
})
export class FileListPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  files: FileMetadata[]
  isSidebarOpen: boolean
  filteredFiles: FileMetadata[]
  listOfSearchName: string[] = []
  listOfSearchAddress: string[] = []
  showMsg: boolean = false
  approvedFiles: FileMetadata[]
  receivedFiles: FileMetadata[]
  errorFiles:  FileMetadata[]
  activeKey = 0
  isDisabled: boolean
  approvedPageSlice: any 
  receivedPageSlice: any 
  p: any
  opened: boolean;
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
    private service: FileService, private fileManager: FilePageManagerComponent, private router: Router) {
  }


  ngOnInit(): void {
    
    //this.store.dispatch(new UserActions.LoadFiles())
    this.service.loadFiles().subscribe(files => {
      
      if (files) {

        this.files = files.filter(c => c.requestType == 'cardrequest')
        this.approvedFiles = this.files.filter(c => c.status == 'Approved')
        this.receivedFiles = this.files.filter(c => c.status == 'Received' || c.status == 'Loading' || c.status == 'AmlockError') 
        this.filteredFiles = this.receivedFiles            
        this.approvedPageSlice = this.approvedFiles.slice(0, 5) 
        this.receivedPageSlice = this.receivedFiles.slice(0, 5) 

      }
    })
    
    this.store.pipe(select(selectFiles())).subscribe(files => {
    
      if (files) {

        this.files = files.filter(c => c.requestType == 'cardrequest')
        this.approvedFiles = this.files.filter(c => c.status == 'Approved')
        this.receivedFiles = this.files.filter(c => c.status == 'Received' || c.status == 'Loading' || c.status == 'AmlockError') 
        this.filteredFiles = this.receivedFiles        
        this.approvedPageSlice = this.approvedFiles.slice(0, 5) 
        this.receivedPageSlice = this.receivedFiles.slice(0, 5) 

      }
    })

    this.isDisabled = true

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
  viewApproved(){
    this.filteredFiles = this.approvedFiles
  }
  viewReceived(){
    this.filteredFiles = this.receivedFiles
  }
  trackByFn(index: number, item: any): any
    {
        return item.id || index;
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
      debugger
      this.service.changeMessage(file)
      var fileManagers = new FilePageManagerComponent(this.service)
      fileManagers.ngOnInit()
      this.router.navigate(['/file-manager/files',file.id]);

    }
    


  onApprove(file): any {
    if (file.requestType === 'carddefunding') {

      const metadata = { ...file }
      metadata.status = 'Approved'
      this.showMsg = true


      if (file.batchNumber) {
        const update: Update<FileMetadata> = {
          id: file.id,
          changes: metadata
        }
        this.store.dispatch(approveFundOrDefund({ file }))
        this.store.dispatch(loadFileDefundRequests({ fileBatchNumber: file.batchNumber }))
      }


    }


    else if (file.requestType === 'cardfunding') {
      const metadata = { ...file }
      metadata.status = 'Approved'
      this.showMsg = true

      this.store.dispatch(approveFundOrDefund({ file: metadata }))


    }

    else {
      const metadata = { ...file }
      metadata.status = 'Loading'
      this.showMsg = true
   
      if (file.batchNumber) {

        const update: Update<FileMetadata> = {
          id: metadata.id,
          changes: metadata
        }
        this.store.dispatch(approveFile({ file: update }))
     
      }

    }
    setTimeout(() => {
      this.showMsg = false
    }, 10000)
  }
  exportToCsv(filter): any {
    let name = 'cardrequestsfiles.csv'
    let filteredFiles = this.files
    if (filter) {
      name = filter + name + '.csv'
      filteredFiles = this.files.filter(a => a.status.toLowerCase() === filter.toLowerCase())
    }
    this.service.exportToCsv(name, filteredFiles)
  }
 

}

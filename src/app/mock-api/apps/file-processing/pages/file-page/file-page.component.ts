import { Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute, Router } from '@angular/router'
import { Update } from '@ngrx/entity'
import { select, Store } from '@ngrx/store'
import { AppState } from 'app/mock-api/store'
import { Account } from 'app/shared/models/account.model'
import { Card } from 'app/shared/models/card.model'
import { Customer } from 'app/shared/models/customer.model'
import { FileMetadata } from 'app/shared/models/filemetadata.model'

import { FileService } from '../../services/files.service'
import { loadBatchCustomers } from '../../store/actions/customers.actions'
import { CardsLoaded, loadFileAccounts, loadFileCards, reApproveChargeFee, reApproveFile, updateCards } from '../../store/actions/files.actions'
import { selectFileAccounts } from '../../store/selectors/accounts.selector'
import { selectCards, selectFileCards } from '../../store/selectors/cards.selector'
import { selectBatchCustomers } from '../../store/selectors/customers.selector'
import { selectFile } from '../../store/selectors/files.selector'

@Component({
  selector: 'app-file-page',
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.scss']
})
export class FilePageComponent implements OnInit {
  fileId: any
  @Input() file: any
  filter: string
  accounts: Account[]
  customers: Customer[]
  cards: Card[]
  successfulCustomers: Customer[]
  errorsCustomers: Customer[]
  rejectedCustomers: Customer[]
  amlockRejectedCustomers: Customer[]
  cardChargeDebitError: Card[]
  cardChargeCreditError: Card[]
  cardRequestFailed: Card[]
  filteredCards: Card[]
  showMsg = false
  showResubmit = false
  showResubmitCard = false
  isSidebarOpen: boolean
  filteredCustomers: Customer[]
  listOfSearchName: string[] = []
  listOfSearchAddress: string[] = []
  successPageSlice: any
    errorPageSlice: any
    rejectedPageSlice: any
    searchInputControl: FormControl = new FormControl();
 amlockRejectedPageSlice: any 
  activeKey = 0
  mapOfSort: { [key: string]: any } = {
    file: null,
    batchNumber: null,
    status: null,
    fileReference: null,
    timeSaved: null
  }
  sortName: string | null = null
  sortValue: string | null = null
  constructor(private activatedroute: ActivatedRoute,
    private service: FileService,
    private store: Store<AppState>,
 
    private router: Router) {
      

    this.activatedroute.params.subscribe(
      params => {
        this.fileId = params['id']
        this.loadFile()
        if (this.file) {
          this.store.dispatch(loadFileAccounts({ fileBatchNumber: this.file.batchNumber }))
          this.store.dispatch(loadFileCards({ fileBatchNumber: this.file.batchNumber }))
        }
      }
    )
  }


  ngOnInit(): void {

   this.GetCustomers()
   debugger
   this.successPageSlice = this.successfulCustomers.slice(0, 5)
   this.errorPageSlice = this.errorsCustomers.slice(0, 5)
   this.rejectedPageSlice = this.rejectedCustomers.slice(0, 5)
   this.amlockRejectedPageSlice = this.amlockRejectedCustomers.slice(0, 5)


    this.loadFile()
    this.loadAccounts()
    this.loadCards()
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
  changeKey(key) {
    this.activeKey = key
  }
  OnPageChange(event: PageEvent) {
    
    const startIndex = event.pageIndex * event.pageSize;

    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.customers.length) {
      endIndex = this.customers.length;
    }
    this.successPageSlice = this.successfulCustomers.slice(startIndex, endIndex)
    this.errorPageSlice = this.errorsCustomers.slice(startIndex, endIndex)
    this.rejectedPageSlice = this.rejectedCustomers.slice(startIndex, endIndex)
    this.amlockRejectedPageSlice = this.amlockRejectedCustomers.slice(startIndex, endIndex)

  }
  loadCustomers(): any {

    this.store.dispatch(loadBatchCustomers(this.file.batchNumber))

    if (this.file) {

      this.store.pipe(select(selectBatchCustomers(this.file.batchNumber))).subscribe(customers => {

        this.customers = customers
        if (this.customers && this.customers.length > 0) {
          this.successfulCustomers = this.customers.filter(c => c.status === 'Approved' || c.status === 'Received')
          this.errorsCustomers = this.customers.filter(c => c.status === 'Error')
          this.rejectedCustomers = this.customers.filter(c => c.status === 'Rejected')
          this.amlockRejectedCustomers = this.customers.filter(c => c.status === 'AmlockRejected')
          this.filteredCustomers = this.successfulCustomers
        }
      })
    }
  }
  loadAccounts(): any {
    if (this.file) {
      this.store.pipe(select(selectFileAccounts(this.file.batchNumber))).subscribe(accounts => {

        if (accounts) {
          this.accounts = accounts
        }
      })
    }
  }

  loadFile(): any {
    if (this.fileId) {
      this.store.pipe(select(selectFile(this.fileId))).subscribe(file => {

        if (file) {
          this.file = file
          this.loadCustomers()
        }
      })
    }
  }
  loadCards(): any {

    if (this.file) {

      //this.store.dispatch(loadFileCards({ fileBatchNumber: this.file.batchNumber }))
      // this.store.pipe(select(selectFileCards(this.file.batchNumber))).subscribe(cards => {
      this.service.loadFileCards(this.file.batchNumber).subscribe(cards => {

        if (cards) {
          this.filteredCards = this.cards

          if (this.cards && this.cards.length > 0) {
            this.cardChargeDebitError = this.cards.filter(c => c.debitStatus == "Error")
            this.cardChargeCreditError = this.cards.filter(c => c.creditStatus == "Error")
            this.cardRequestFailed = this.cards.filter(c => c.cardStatus == "RequestFailed")
          }

        }
      })
    }
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
    const listOfData = this.customers.filter(item => filterFunc(item))
    if (this.sortName !== null && this.sortValue !== null) {
      this.filteredCustomers = listOfData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
            ? 1
            : -1,
      )
    } else {
      this.filteredCustomers = this.customers
    }
  }

  getAccountNumber(id): any {
    if (id && this.accounts) {
      const customer = this.customers.find(account => account.id === id)
      const acc = this.accounts.find(account => account.customerId === customer.customerId)
      if (acc) {
        return acc.accountNumber
      }
    }
  }
  getCustomerMatch(id): any {
    if (id && this.accounts) {
      const customer = this.customers.find(account => account.id === id)
      if (customer) { return customer.match }
    } else {
      return 'No match found'
    }
  }
  viewErrors(): any {

    this.activeKey = 1
    this.showResubmitCard = false
    this.showResubmit = false
    this.GetCustomers()
    this.filteredCustomers = this.errorsCustomers

    if (this.errorsCustomers.length > 0) {
      this.showResubmit = true

    }
  }
  viewMatchs(): any {
    this.showResubmitCard = false
    this.showResubmit = false
    this.activeKey = 2
    this.GetCustomers()
    this.filteredCustomers = this.rejectedCustomers
    if (this.rejectedCustomers.length > 0) {
      this.showResubmit = true

    }
  }
  viewSuccess(): any {

    this.showResubmitCard = false
    this.showResubmit = false
    this.activeKey = 0
    this.GetCustomers()
    this.filteredCustomers = this.successfulCustomers    

  }

  viewRejected(): any {
    this.showResubmitCard = false
    this.showResubmit = false
    this.activeKey = 3
    this.GetCustomers()
    this.filteredCustomers = this.amlockRejectedCustomers
  }
  viewCards(): any {

    this.showResubmit = false
    this.activeKey = 4
    this.service.loadFileCards(this.file.batchNumber).subscribe(cards => {
      if (cards) {
        this.cards = cards
        this.filteredCards = this.cards

        if (this.cards && cards.length > 0) {
          this.cardChargeDebitError = this.cards.filter(c => c.debitStatus == "Error")
          this.cardChargeCreditError = this.cards.filter(c => c.creditStatus == "Error")
          this.cardRequestFailed = this.cards.filter(c => c.cardStatus == "RequestFailed")
        }

        if (this.cardChargeDebitError.length > 0 || this.cardChargeCreditError.length > 0 || this.cardRequestFailed.length > 0) {
          this.showResubmitCard = true

        }
        else {
          this.showResubmitCard = false
        }

        if (this.cardChargeDebitError.length > 0 || this.cardChargeCreditError.length > 0 || this.cardRequestFailed.length > 0) {
          this.showResubmitCard = true

        }
      }
    })
  }
  GetCustomers(): any{
    this.service.loadFileAccounts(this.file.batchNumber).subscribe(customers => {  
      if (customers) {

        this.customers = customers
        this.accounts = customers
        if (this.customers && this.customers.length > 0) {
          this.successfulCustomers = this.customers.filter(c => c.status === 'Approved' || c.status === 'Received')
          this.errorsCustomers = this.customers.filter(c => c.status === 'Error')
          this.rejectedCustomers = this.customers.filter(c => c.status === 'Rejected')
          this.amlockRejectedCustomers = this.customers.filter(c => c.status === 'AmlockRejected')     
        }
      }

    })


  }
  onResubmit(): any {

    const metadata = { ...this.file }
    this.showMsg = true

    if (this.file.batchNumber) {
      this.store.dispatch(reApproveFile({ file: metadata }))
    }
    setTimeout(() => {
      this.showMsg = false
    }, 2000)
  }
  onResubmitChargeFee(): any {

    const metadata = { ...this.file }
    this.showMsg = true
    const update: Update<FileMetadata> =
    {
      id: metadata.id,
      changes: metadata
    }

    if (this.file.batchNumber) {

      this.service.reApproveChargeFee(metadata).subscribe(cards => {

        if (cards) {
          this.cards = cards
          this.filteredCards = this.cards

          if (this.cards && cards.length > 0) {
            this.cardChargeDebitError = this.cards.filter(c => c.debitStatus == "Error")
            this.cardChargeCreditError = this.cards.filter(c => c.creditStatus == "Error")
            this.cardRequestFailed = this.cards.filter(c => c.cardStatus == "RequestFailed")
          }

          if (this.cardChargeDebitError.length > 0 || this.cardChargeCreditError.length > 0 || this.cardRequestFailed.length > 0) {
            this.showResubmitCard = true

          }
          else {
            this.showResubmitCard = false
          }


        }

      })

    }
    setTimeout(() => {
      this.showMsg = false
    }, 2000)

  }

  exportToCsv(filter): any {
    let name = 'accounts.csv'
    let filteredAccounts = this.accounts
    if (filter) {
      name = filter + name + '.csv'
      filteredAccounts = this.accounts.filter(a => a.status.toLowerCase() === filter.toLowerCase())
    }
    this.service.exportToCsv(name, filteredAccounts)
  }
  export1ToCsv(filter, filter1): any {

    let name = 'accounts.csv'
    let filteredAccounts = this.accounts
    if (filter) {
      name = filter + name + '.csv'
      filteredAccounts = this.accounts.filter(a => a.status.toLowerCase() === filter.toLowerCase() || a.status.toLowerCase() === filter1.toLowerCase())
    }
    this.service.exportToCsv(name, filteredAccounts)
  }
  exportCardsToCsv(filter): any {

    let name = 'cardstatus.csv'
    let filteredCards = this.cards
    if (filter) {
      name = filter + name + '.csv'
      filteredCards = this.cards
    }
    this.service.exportToCsv(name, filteredCards)
  }
}


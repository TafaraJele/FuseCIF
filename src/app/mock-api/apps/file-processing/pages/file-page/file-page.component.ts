import { Component, Input, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { Update } from '@ngrx/entity'
import { Account } from 'app/shared/models/account.model'
import { Card } from 'app/shared/models/card.model'
import { Customer } from 'app/shared/models/customer.model'
import { FileMetadata } from 'app/shared/models/filemetadata.model'
import { NotificationsService } from 'app/shared/notifications/notifications.service'
import { FileService } from '../../services/files.service'


@Component({
  selector: 'app-file-page',
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.scss']
})
export class FilePageComponent implements OnInit {
  fileId: any
  @Input() file: any
  filter: string
  accounts: Account[] =[]
  customers: Customer[] =[]
  cards: Card[] =[]
  filteredCustomers: Customer[] = []
  successfulCustomers: Customer[] =[]
  errorsCustomers: Customer[] =[]
  rejectedCustomers: Customer[]
  amlockRejectedCustomers: Customer[] =[]
  cardChargeDebitError: Card[] =[]
  cardChargeCreditError: Card[] =[]
  cardRequestFailed: Card[] =[]
  filteredCards: Card[] =[]
  showMsg = false
  showResubmit = false
  showResubmitCard = false  
  successPageSlice: any[] =[]
  errorPageSlice: any[] = []
  rejectedPageSlice: any[] =[]
  cardsPageSlice: any[] =[] 
  amlockRejectedPageSlice: any[] =[]
  activeKey = 0
  showApprove: boolean
 
  constructor(
    private service: FileService,
    private notifyService : NotificationsService) {
    
  }

  ngOnInit(): void {
   
    if((this.file.status === 'Received') || (this.file.status == 'AmlockError'))
    {
      this.showApprove = true
    }
    this.GetCustomers()    
    this.loadCards()
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
    this.cardsPageSlice = this.cards.slice(startIndex, endIndex)

  }  
  
  loadCards(): any {

    if (this.file) {
      
      this.service.loadFileCards(this.file.batchNumber).subscribe(cards => {

        if (cards) {
          this.filteredCards = this.cards

          if (this.cards && this.cards.length > 0) {
            this.cardChargeDebitError = this.cards.filter(c => c.debitStatus == "Error")
            this.cardChargeCreditError = this.cards.filter(c => c.creditStatus == "Error")
            this.cardRequestFailed = this.cards.filter(c => c.cardStatus == "RequestFailed")
          }
          
        }
        this.cardsPageSlice = this.cards.slice(0,5)

      })
    }
  }
 
  viewErrors(): any {
    
    this.activeKey = 1
    this.showResubmitCard = false
    this.showResubmit = false
    this.GetCustomers()
    this.filteredCustomers = this.errorsCustomers

  }
  viewMatchs() {
    
    this.showResubmitCard = false
    this.showResubmit = false
    this.activeKey = 2
    this.GetCustomers()
    this.filteredCustomers = this.rejectedCustomers
    
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
          this.showApprove = false

        }
        else {
          this.showResubmitCard = false
        }
        
      }

      this.cardsPageSlice = this.cards.slice(0,5)
    })
  }
  GetCustomers(): any {
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

        this.successPageSlice = this.successfulCustomers.slice(0, 5)
        this.errorPageSlice = this.errorsCustomers.slice(0, 5)
        this.rejectedPageSlice = this.rejectedCustomers.slice(0, 5)
        this.amlockRejectedPageSlice = this.amlockRejectedCustomers.slice(0, 5)
      }

    })


  }
 
  onApprove() {
    this.showApprove = false
     this.notifyService.showNotification('notification','File is being approved. Please wait!!!','') 

    this.service.approveFile(this.file).subscribe(result =>{

      
      if(result.accepted){
        this.file = result.resource        
        this.GetCustomers()
        this.loadCards()
      }
      if(this.file.status =='AmlockError')
      {
        this.showApprove = true
        this.notifyService.showNotification('error','Connection to Amlock failed. ','OK') 
      }
      if(this.file.status =='Approved'){
        this.notifyService.showNotification('success','File Approved','OK') 
      }

    })

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


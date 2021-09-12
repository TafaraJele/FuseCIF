import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CIFConfiguration } from 'app/shared/models/cif-configuration.model'
import { FileApproval } from 'app/shared/models/file-approval.model'
import { FileMetadata } from 'app/shared/models/filemetadata.model'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'


const baseUrl = environment.fileProcessingUrl

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}
@Injectable({
    providedIn: 'root',
})
export class FileService {

    constructor(private _httpClient: HttpClient) { }

    loadFiles(): Observable<any> {
        return this._httpClient.get(baseUrl + '/api/files/filemetadata')
    }
    loadBatchCustomers(fileBatchNumber: string): Observable<any> {
        return this._httpClient.get(baseUrl + '/api/Customers/' + fileBatchNumber)
    }
    loadSettings(): Observable<any> {
        return this._httpClient.get(baseUrl + '/api/configuration/settings')
    }

    loadFileAccounts(fileBatchNumber: string): Observable<any> {
        return this._httpClient.get(baseUrl + '/api/files/' + fileBatchNumber)
    }
    loadFileCards(fileBatchNumber:string): Observable<any>
    {     
        return this._httpClient.get(baseUrl + '/api/accounts/' + fileBatchNumber +'/account-cards',httpOptions)
    }

    approveFile(file: Partial<FileMetadata>): Observable<any> {
        const approval = new FileApproval()
        approval.fileReference = file.fileReference
        approval.batchNumber = file.batchNumber
        return this._httpClient.post(baseUrl + '/api/files/approve', approval, httpOptions)
    }
    reApproveFile(file: FileMetadata): any {
        const approval = new FileApproval()
        approval.fileReference = file.fileReference
        approval.batchNumber = file.batchNumber
      
        return this._httpClient.post(baseUrl + '/api/files/resubmit', approval, httpOptions)
       
    }

    addSettings(settings: Partial<CIFConfiguration>): Observable<any> {
        return this._httpClient.post(baseUrl + '/api/configuration/settings', settings, httpOptions)
    }

    updateSettings(changes: Partial<CIFConfiguration>): Observable<any> {
        return this._httpClient.put(baseUrl + '/api/configuration/settings', changes, httpOptions)
    }

    approveFundOrDefund(file: Partial<FileMetadata>): Observable<any> {
        return this._httpClient.post(baseUrl + '/api/accounts/approvefund-defund-requests', file, httpOptions)
      }

      reApproveChargeFee(file: Partial<FileMetadata>):Observable<any>{     
         
          return this._httpClient.post(baseUrl + '/api/files/resubmit-chargefee',file , httpOptions )

      }

      loadFileFundRequests(fileBatchNumber: string):  Observable<any> {
        return this._httpClient.get(baseUrl + '/api/accounts/cardfundrequests/' + fileBatchNumber, httpOptions)
    }
    loadFileDeFundRequests(fileBatchNumber: string):  Observable<any> {
        return this._httpClient.get(baseUrl + '/api/accounts/carddefundrequests/' + fileBatchNumber, httpOptions)
    }

    exportToCsv(filename: string, rows: object[]): any {
        if (!rows || !rows.length) {
            return
        }
        const separator = ','
        const keys = Object.keys(rows[0])
        const csvData = keys.join(separator) + '\n' + rows.map(row => {
            return keys.map(k => {
                let cell = row[k] === null || row[k] === undefined ? '' : row[k]
                cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""')
                if (cell.search(/("|,|\n)/g) >= 0) {
                    cell = `"${cell}"`
                }
                return cell
            }).join(separator)
        }).join('\n')

        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename)
        } else {
            const link = document.createElement('a')
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob)
                link.setAttribute('href', url)
                link.setAttribute('download', filename)
                link.style.visibility = 'hidden'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        }
    }
}
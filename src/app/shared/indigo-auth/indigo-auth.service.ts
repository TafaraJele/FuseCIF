import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Credentials } from '../models/indigo-credentials';



const baseUrl = environment.fileProcessingUrl

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}
@Injectable({
  providedIn: 'root'
})
export class IndigoAuthService {
 isauthenticated$: BehaviorSubject<any>
  constructor(private _httpClient: HttpClient) { 
    this.isauthenticated$ = new BehaviorSubject(false)
  }

  IndigoLogin( credentials:Credentials): Observable<any>{ 

return this._httpClient.post(baseUrl+'/api/authentication/login',credentials,httpOptions)

  }
}

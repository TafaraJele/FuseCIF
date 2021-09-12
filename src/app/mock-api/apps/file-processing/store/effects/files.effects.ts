import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap, switchMap } from 'rxjs/operators'
import { CustomersActionTypes, FileActionTypes } from '../actions/files.action-types'
import { FileService } from '../../services/files.service'
import { CardsLoaded, defundRequestsLoaded, fileAccountsLoaded, fileApproved, FileLoaded, filesLoaded, fundRequestsLoaded, updateCards, updateFile } from '../actions/files.actions'
import { pipe } from 'rxjs'

import { batchCustomersLoaded } from '../actions/customers.actions'

import { Update } from '@ngrx/entity'
import { Card } from 'app/shared/models/card.model'
import { showSuccess } from '../actions/shared.actions'
import { UserNotification } from 'app/shared/models/user-notification.model'
import { FileMetadata } from 'app/shared/models/filemetadata.model'


@Injectable()
export class FilesEffects {
  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActionTypes.loadFiles),
      mergeMap(() => this.service.loadFiles()),
      map(payload => filesLoaded({ files: payload })),
    ),
  )

  loadBatchCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActionTypes.loadBatchCustomers),
      mergeMap((action) => this.service.loadBatchCustomers(action.fileBatchNumber)),
      map(payload => batchCustomersLoaded({ customers: payload })),
    ),
  )
  loadFileAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActionTypes.loadFileAccounts),
      mergeMap(action => this.service.loadFileAccounts(action.fileBatchNumber)),
      map(payload => fileAccountsLoaded({ accounts: payload })),
    ),
  )
  loadFileCards$ = createEffect(() =>
    this.actions$.pipe(

      ofType(FileActionTypes.loadFileCards),
      mergeMap(action => this.service.loadFileCards(action.fileBatchNumber)),
      map(payload => CardsLoaded({cards:payload})),
      ),
    )
    //{ dispatch: true }
    //map(payload => CardsLoaded({cards: payload}) )


  // )
  loadFileFundRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActionTypes.loadFileFundRequests),
      mergeMap(action => this.service.loadFileFundRequests(action.fileBatchNumber)),
      //  map(payload => fundRequestsLoaded({ fundrequests: payload })),
      //  ),
      //)
      pipe(
        switchMap(payload => {

          return [
            fundRequestsLoaded({ fundrequests: payload })
          ]
        }),
      ),
    ),
    { dispatch: true },
  )
  loadFileDefundRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActionTypes.loadFileDefundRequests),
      mergeMap(action => this.service.loadFileDeFundRequests(action.fileBatchNumber)),
      //  map(payload => fundRequestsLoaded({ fundrequests: payload })),
      //  ),
      //)
      pipe(
        switchMap(payload => {

          return [
            defundRequestsLoaded({ defundrequests: payload })
          ]
        }),
      ),
    ),
    { dispatch: true },
  )

  ReapproveFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FileActionTypes.reApproveFile),
        mergeMap(action => this.service.reApproveFile(action.file)),
        pipe(
          switchMap((payload: any) => {
            return [
              showSuccess({
                notification: new UserNotification({
                  title: 'Successfully approved',
                  message: 'File approved sucessfully.',
                }),
              }),
            ]
          }),
        ),
      ),
    { dispatch: true },
  )
  reApproveChargeFee$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FileActionTypes.reApproveChargeFee),
        mergeMap(action => this.service.reApproveChargeFee(action.file)),
        pipe(
          switchMap((payload: any) => {
           
            if (payload) {
              
              let cards:any[] = payload
              //const update : Update<Card>[] = card
              cards.forEach(card => {
                const update : Update<Card> = 
            {
              id: card.id,
              changes: card

            }
            updateCards({update})
              })
              
              return [
               
                //CardsLoaded({ cards: payload }),
              
                
                showSuccess({
                  notification: new UserNotification({
                    title: 'Successfully approved',
                    message: 'File approved sucessfully.',
                  }),
                }),
              
                //fileApproved({ file: payload.resource }),
               
                
              ]
            }
            
          }),
        ),
      ),
    { dispatch: true },
  )
  ApproveFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FileActionTypes.approveFile),
        mergeMap(action => this.service.approveFile(action.file.changes)),
        pipe(
          switchMap((payload: any) => {

            if (payload.resource) {
          
              const file = payload.resource
              const update: Update<FileMetadata> = {
                id: file.id,
                changes: file
              }
              return [
                showSuccess({
                  notification: new UserNotification({
                    title: 'Successfully approved',
                    message: 'File approved sucessfully.',
                  }),
                }),
                updateFile({ update }),
              ]
            }

          }),
        ),
      ),
    { dispatch: true },
  )
  approveFundOrDefund$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FileActionTypes.approveFundOrDefund),
        mergeMap(action => this.service.approveFundOrDefund(action.file)),
        pipe(
          switchMap((payload: any) => {
            return [
              showSuccess({
                notification: new UserNotification({
                  title: 'Successfully approved',
                  message: 'Approved sucessfully.',
                }),
              }),
              FileLoaded({ file: payload.resource }),
            ]
          }),
        ),
      ),
    { dispatch: true },
  )
  constructor(private actions$: Actions, private service: FileService) { }
}

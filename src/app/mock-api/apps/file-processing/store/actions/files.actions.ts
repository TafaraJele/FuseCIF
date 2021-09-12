import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { FileMetadata } from 'app/shared/models/filemetadata.model'
import { Account } from 'app/shared/models/account.model'
import { FundRequest } from 'app/shared/models/fundrequest.model'
import { Card } from 'app/shared/models/card.model'


// Fetch data requests
export const loadFiles = createAction('[Files resolver] Load files')
export const loadFileAccounts = createAction('[Files resolver] Load file accounts', props<{ fileBatchNumber: string }>())
export const filesLoaded = createAction(
  '[Files service] Files loaded',
  props<{ files: FileMetadata[] }>(),
)
export const loadFileFundRequests = createAction('[Files resolver] Load fund requests', props<{ fileBatchNumber: string }>())
export const loadFileDefundRequests = createAction('[Files resolver] Load defund requests', props<{ fileBatchNumber: string }>())
export const loadFileCards = createAction('[Files resolver] Load cards',props<{fileBatchNumber: string}>() )
export const fileAccountsLoaded = createAction(
  '[Files service] File accounts loaded',
  props<{ accounts: Account[] }>(),
)
export const fundRequestsLoaded = createAction('File requests loaded', props<{ fundrequests: FundRequest[] }>(),

)
export const defundRequestsLoaded = createAction('File defund requests loaded', props<{ defundrequests: FundRequest[] }>(),

)

export const FileLoaded = createAction(
  '[Files service] File loaded',
  props<{ file: FileMetadata }>(),
)
export const CardsLoaded = createAction(
  'File cards loaded', props<{ cards: Card[]}>(),
)

export const approveFile = createAction('[File manager] Approve file', props<{ file: Update<FileMetadata> }>())
export const updateFile = createAction('[File manager] Update file', props<{ update: Update<FileMetadata> }>())
export const updateCards = createAction('[File manager] Update cards', props <{update : Update<Card> }>())
export const reApproveFile = createAction('[File manager] Re-Approve file', props<{ file: FileMetadata }>())
export const fileApproved = createAction('[Files service] File approved', props<{ file: FileMetadata }>(),)
export const approveFundOrDefund = createAction('[File manager] Approve Fund Defund ', props<{ file: FileMetadata }>())
export const reApproveChargeFee = createAction('[File manager] Re-Approve Charge Fee', props<{ file: FileMetadata }>())


import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreModules } from 'app/mock-api/store'
import * as fromFiles from '../reducers/files.reducer'
import * as fromFileAccounts from '../reducers/accounts.reducer'
import * as fromCustomers from '../reducers/customers.reducer'
import * as fromFundRequests from '../reducers/fundrequests.reducer'
import * as fromDefundRequests from '../reducers/defundrequest.reducer'
import * as fromCards from '../reducers/cards.reducer'
import { FilesEffects } from '../effects/files.effects'

@NgModule({
  imports: [
    StoreModule.forFeature(StoreModules.Files, fromFiles.FilesStateReducer),
    StoreModule.forFeature(StoreModules.Accounts, fromFileAccounts.FileAccountsStateReducer),
    StoreModule.forFeature(StoreModules.Customers, fromCustomers.CustomersStateReducer),
    StoreModule.forFeature(StoreModules.FundRequests, fromFundRequests.FundRequestStateReducer),
    StoreModule.forFeature(StoreModules.DefundRequests, fromDefundRequests.DefundRequestStateReducer),
    EffectsModule.forFeature([FilesEffects]),
    StoreModule.forFeature(StoreModules.Cards, fromCards.FileCardsStateReducer ),
  ],
})
export class FilesStateModule {}

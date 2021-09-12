import * as fromFileAccounts from '../reducers/accounts.reducer'

import * as _ from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { FileAccountsState } from '../reducers/accounts.reducer'
import { StoreModules } from 'app/mock-api/store'

export const selectFileAccountsState = createFeatureSelector<FileAccountsState>(StoreModules.Accounts)
export const selectAccounts = () => createSelector(selectFileAccountsState, fromFileAccounts.selectAll)

export const selectAccount = (id) => createSelector(
    selectFileAccountsState,
    files => {
        const value = files.entities[id]
        return value
    }
)

export const selectFileAccounts = (batchNumber) => createSelector(
    selectFileAccountsState,
    (accounts) => {
        let filtered = []
        if (accounts.entities) {
            filtered = _.filter(accounts.entities, (account) => account.batchNumber === batchNumber)
        }
        return filtered
    })

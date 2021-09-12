import * as fromFundRequests from '../reducers/fundrequests.reducer'
import * as _ from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { FundRequestState } from '../reducers/fundrequests.reducer'
import { StoreModules } from 'app/mock-api/store'

export const selectFundRequestsState = createFeatureSelector<FundRequestState>(StoreModules.FundRequests)
export const selectFundRequests = () => createSelector(selectFundRequestsState, fromFundRequests.selectAll)

export const selectFundRequest = (id) => createSelector(
    selectFundRequestsState,
    files => {
        const value = files.entities[id]
        return value
    }
)

export const selectFileFundRequests = (batchNumber) => createSelector(
    selectFundRequestsState,
    (fundrequests) => {
       
        let filtered = []
        if (fundrequests && fundrequests.entities) {
            filtered = _.filter(fundrequests.entities, (account) => account.batchNumber === batchNumber)
        }
        return filtered
    })

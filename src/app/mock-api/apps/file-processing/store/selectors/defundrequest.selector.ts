import * as fromDefundRequests from '../reducers/defundrequest.reducer'

import * as _ from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DefundRequestState } from '../reducers/defundrequest.reducer'
import { StoreModules } from 'app/mock-api/store'

export const selectDefundRequestsState = createFeatureSelector<DefundRequestState>(StoreModules.DefundRequests)
export const selectDefundRequests = () => createSelector(selectDefundRequestsState, fromDefundRequests.selectAll)

export const selectDefundRequest = (id) => createSelector(
    selectDefundRequestsState,
    files => {
        const value = files.entities[id]
        return value
    }
)

export const selectFileDefundRequests = (batchNumber) => createSelector(
    selectDefundRequestsState,
    (defundrequests) => {
       
        let filtered = []
        if (defundrequests && defundrequests.entities) {
            filtered = _.filter(defundrequests.entities, (defundrequest) => defundrequest.batchNumber === batchNumber)
        }
        return filtered
    })

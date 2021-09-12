import * as fromCustomers from '../reducers/customers.reducer'

import * as _ from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CustomersState } from '../reducers/customers.reducer'
import { StoreModules } from 'app/mock-api/store'

export const selectCustomersState = createFeatureSelector<CustomersState>(StoreModules.Accounts)
export const selectCustomers = () => createSelector(selectCustomersState, fromCustomers.selectAll)

export const selectCustomer = (id) => createSelector(
    selectCustomersState,
    customers => {
        const value = customers.entities[id]
        return value
    }
)

export const selectBatchCustomers = (batchNumber) => createSelector(
    selectCustomersState,
    (customers) => {
        let filtered = []
        if (customers.entities) {
            filtered = _.filter(customers.entities, (account) => account.batchNumber === batchNumber)
        }
        return filtered
    })

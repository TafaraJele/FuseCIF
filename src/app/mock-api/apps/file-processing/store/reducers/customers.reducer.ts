import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { Customer } from 'app/shared/models/customer.model'

import { CustomersActionTypes } from '../actions/files.action-types'


export interface CustomersState extends EntityState<Customer> {}

export const customersEntityAdapter = createEntityAdapter<Customer>()

export const initialCustomersState = customersEntityAdapter.getInitialState()

const customersStateReducer = createReducer(
    initialCustomersState,
    on(CustomersActionTypes.batchCustomersLoaded, (state, action) => customersEntityAdapter.addMany(action.customers, state)),
)

export const { selectAll, selectIds, selectEntities } = customersEntityAdapter.getSelectors()

// tslint:disable-next-line:typedef
export function CustomersStateReducer(state: CustomersState | undefined, action: Action) {
    return customersStateReducer(state, action)
}

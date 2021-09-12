
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { Account } from 'app/shared/models/account.model'

import { FileActionTypes } from '../actions/files.action-types'

export interface FileAccountsState extends EntityState<Account> {}

export const fileAccountsEntityAdapter = createEntityAdapter<Account>()

export const initialFileAccountsState = fileAccountsEntityAdapter.getInitialState()

const fileAccountsStateReducer = createReducer(
    initialFileAccountsState,
    on(FileActionTypes.fileAccountsLoaded, (state, action) => fileAccountsEntityAdapter.addMany(action.accounts, state)),
)

export const { selectAll, selectIds, selectEntities } = fileAccountsEntityAdapter.getSelectors()

// tslint:disable-next-line:typedef
export function FileAccountsStateReducer(state: FileAccountsState | undefined, action: Action) {
    return fileAccountsStateReducer(state, action)
}

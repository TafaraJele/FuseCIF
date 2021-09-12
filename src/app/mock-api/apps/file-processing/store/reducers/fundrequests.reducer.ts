
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { FundRequest } from 'app/shared/models/fundrequest.model'

import { FileActionTypes } from '../actions/files.action-types'

export interface FundRequestState extends EntityState<FundRequest> {}

export const fundRequestEntityAdapter = createEntityAdapter<FundRequest>()

export const initialDefundRequestState = fundRequestEntityAdapter.getInitialState()

const fundRequestStateReducer = createReducer(
    initialDefundRequestState,
    on(FileActionTypes.fundRequestsLoaded, (state, action) => fundRequestEntityAdapter.addMany(action.fundrequests, state)),
)

export const { selectAll, selectIds, selectEntities } = fundRequestEntityAdapter.getSelectors()

// tslint:disable-next-line:typedef
export function FundRequestStateReducer(state: FundRequestState | undefined, action: Action) {
    return fundRequestStateReducer(state, action)
}

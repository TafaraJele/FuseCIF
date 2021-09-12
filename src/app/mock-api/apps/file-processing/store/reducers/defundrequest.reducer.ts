
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { FundRequest } from 'app/shared/models/fundrequest.model'

import { FileActionTypes } from '../actions/files.action-types'

export interface DefundRequestState extends EntityState<FundRequest> {}

export const defundRequestEntityAdapter = createEntityAdapter<FundRequest>()

export const initialDefundRequestState = defundRequestEntityAdapter.getInitialState()

const defundRequestStateReducer = createReducer(
    initialDefundRequestState,
    on(FileActionTypes.defundRequestsLoaded, (state, action) => defundRequestEntityAdapter.addMany(action.defundrequests, state)),
)

export const { selectAll, selectIds, selectEntities } = defundRequestEntityAdapter.getSelectors()

// tslint:disable-next-line:typedef
export function DefundRequestStateReducer(state: DefundRequestState | undefined, action: Action) {
    return defundRequestStateReducer(state, action)
}

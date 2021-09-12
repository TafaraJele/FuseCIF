
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { Card } from 'app/shared/models/card.model'

import { FileActionTypes } from '../actions/files.action-types'

export interface FileCardsState extends EntityState<Card> {}

export const fileCardsEntityAdapter = createEntityAdapter<Card>()

export const initialFileCardsState = fileCardsEntityAdapter.getInitialState()

const fileCardsStateReducer = createReducer(

    initialFileCardsState,
    on(FileActionTypes.CardsLoaded, (state, action) => fileCardsEntityAdapter.addMany(action.cards, state)),
    //on(FileActionTypes.updateCards, (state, action) => fileCardsEntityAdapter.updateMany(action.update, state)),
)

export const { selectAll, selectIds, selectEntities } = fileCardsEntityAdapter.getSelectors()

// tslint:disable-next-line:typedef
export function FileCardsStateReducer(state: FileCardsState | undefined, action: Action) {
    return fileCardsStateReducer(state, action)
}

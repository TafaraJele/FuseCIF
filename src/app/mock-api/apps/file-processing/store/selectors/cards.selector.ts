import * as fromFileCards from '../reducers/cards.reducer'

import * as _ from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { FileCardsState } from '../reducers/cards.reducer'
import { StoreModules } from 'app/mock-api/store'

export const selectFileCardsState = createFeatureSelector<FileCardsState>(StoreModules.Cards)
export const selectCards = () => createSelector(selectFileCardsState, fromFileCards.selectAll)

export const selectCard = (id) => createSelector(
    selectFileCardsState,
    cards => {
        const value = cards.entities[id]
        return value
    }
)

export const selectFileCards = (batchNumber) => createSelector(
    selectFileCardsState,
    (cards) => {
        let filtered = []
      
        if (cards.entities) {
            filtered = _.filter(cards.entities, (card) => card.batchNumber === batchNumber)
        }
        return filtered
    })

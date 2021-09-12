import * as fromFiles from '../reducers/files.reducer'
import * as _ from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { FilesState } from '../reducers/files.reducer'
import { StoreModules } from 'app/mock-api/store'

export const selectFilesState = createFeatureSelector<FilesState>(StoreModules.Files)
export const selectFiles = () => createSelector(selectFilesState, fromFiles.selectAll)

export const selectFile = (id) => createSelector(
  selectFilesState,
  files => {
    const value = files.entities[id]
    return value
  }
)

export const areFilesLoaded = () =>
  createSelector(selectFilesState, state => {
    return state.filesLoaded
  })

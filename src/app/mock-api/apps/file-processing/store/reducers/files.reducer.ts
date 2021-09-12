
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { FileMetadata } from 'app/shared/models/filemetadata.model'

import { FileActionTypes } from '../actions/files.action-types'

export interface FilesState extends EntityState<FileMetadata> {
    filesLoaded: boolean
}

export const filesEntityAdapter = createEntityAdapter<FileMetadata>()

export const initialFilesState = filesEntityAdapter.getInitialState({
    filesLoaded: false,
})

const filesStateReducer = createReducer(
    initialFilesState,
    on(FileActionTypes.filesLoaded, (state, action) => filesEntityAdapter.addMany(action.files, { ...state, filesLoaded: true })),
    on(FileActionTypes.updateFile, (state, action) => filesEntityAdapter.updateOne(action.update, state)),
    on(FileActionTypes.approveFile, (state, action) => filesEntityAdapter.updateOne(action.file, state)),
    on(FileActionTypes.FileLoaded, (state, action) => filesEntityAdapter.upsertOne(action.file, state))

)

export const { selectAll, selectIds, selectEntities } = filesEntityAdapter.getSelectors()

// tslint:disable-next-line:typedef
export function FilesStateReducer(state: FilesState | undefined, action: Action) {
    return filesStateReducer(state, action)
}

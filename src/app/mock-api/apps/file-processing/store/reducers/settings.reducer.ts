
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { CIFConfiguration } from 'app/shared/models/cif-configuration.model'

import { SettingsActionTypes } from '../actions/files.action-types'

export interface CIFConfigurationState extends EntityState<CIFConfiguration> {
    settingsLoaded: boolean
}

export const settingsEntityAdapter = createEntityAdapter<CIFConfiguration>()

export const initialSettingsState = settingsEntityAdapter.getInitialState({
    settingsLoaded: false,
})

const settingsStateReducer = createReducer(
    initialSettingsState,
    // tslint:disable-next-line:max-line-length
    on(SettingsActionTypes.settingsLoaded, (state, action) => settingsEntityAdapter.addMany(action.settings, { ...state, settingsLoaded: true })),
    on(SettingsActionTypes.updateSettings, (state, action) => settingsEntityAdapter.updateOne(action.settings, state))

)

export const { selectAll, selectIds, selectEntities } = settingsEntityAdapter.getSelectors()

// tslint:disable-next-line:typedef
export function SettingsStateReducer(state: CIFConfigurationState | undefined, action: Action) {
    return settingsStateReducer(state, action)
}

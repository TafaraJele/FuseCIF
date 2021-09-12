import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { CIFConfiguration } from 'app/shared/models/cif-configuration.model'


// Fetch data requests
export const loadCIFSettings = createAction('[Settings resolver] Load CIF configuration settings')
export const settingsLoaded = createAction(
  '[Settings resolver] Configuration settings loaded',
  props<{ settings: CIFConfiguration[] }>(),
)
// tslint:disable-next-line:max-line-length
export const updateSettings = createAction('[Settings manager] Update CIF configuration settings', props<{ settings: Update<CIFConfiguration> }>())
export const addSettings = createAction('[Settings service] Save CIF configuration settings', props<{ settings: CIFConfiguration }>(),
)
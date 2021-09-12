import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
    ActionReducer,
    MetaReducer,
  } from '@ngrx/store'

  import * as fromRouter from '@ngrx/router-store'


import { environment } from 'environments/environment'
  
  export const reducers: ActionReducerMap<any> = {
    router: fromRouter.routerReducer,
   
  }
  
  export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state: any, action: any): any => {
      const result = reducer(state, action)
      console.groupCollapsed(action.type)
      console.log('prev state', state)
      console.log('action', action)
      console.log('next state', result)
      console.groupEnd()
      return result
    }
  }
  
  export const metaReducers: MetaReducer<any>[] = !environment.production ? [logger] : []
  
  export const getSettingsState = createFeatureSelector<any>('settings')
  export const getAddAgentSidebarState = createFeatureSelector<any>('agentPanel')
  
  
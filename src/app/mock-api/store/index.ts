import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router'
import { createFeatureSelector, ActionReducerMap, MetaReducer } from '@ngrx/store'
import * as fromRouter from '@ngrx/router-store'
import { environment } from 'environments/environment'


export interface RouterStateUrl {
  url: string
  queryParams: Params
  params: Params
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
}

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
  'routerReducer',
)

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState
    const { queryParams } = routerState.root

    let state: ActivatedRouteSnapshot = routerState.root
    while (state.firstChild) {
      state = state.firstChild
    }
    const { params } = state

    return {
      url,
      queryParams,
      params,
    }
  }
}

// tslint:disable-next-line:no-empty-interface
export interface AppState {}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : []

export enum StoreModules {
  UserNotifications = 'user-notifications',
  AuthUserProfile = 'auth-user-profile',
  AuthAccessToken = 'auth-access-token',
  Agency = 'agency-admin-agency',
  Files = 'file-metadata',
  Accounts = 'file-accounts',
  Customers = 'file-customers',
  CIFConfigurationSettings = 'CIF-configuration-settings',
  FundRequests = 'file-fundrequests',
  DefundRequests = 'file-defundrequets',
  Cards = 'file-cards',
}

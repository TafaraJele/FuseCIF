import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'

import * as UserActions from './actions'

@Injectable()
export class UserEffects implements OnInitEffects {
  constructor(
    private actions: Actions,

    private router: Router,
    private route: ActivatedRoute,
    private rxStore: Store<any>,
   
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: UserActions.LOAD_CURRENT_ACCOUNT }
  }
}

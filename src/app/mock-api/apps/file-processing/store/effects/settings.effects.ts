import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap, switchMap } from 'rxjs/operators'
import { FileService } from '../../services/files.service'
import { fileApproved, filesLoaded } from '../actions/files.actions'
import { pipe } from 'rxjs'
import { SettingsActionTypes } from '../actions/files.action-types'
import { settingsLoaded } from '../actions/settings.actions'
import { showSuccess } from '../actions/shared.actions'
import { UserNotification } from 'app/shared/models/user-notification.model'

@Injectable()
export class CIFSettingsEffects {
    loadCIFSettings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SettingsActionTypes.loadCIFSettings),
            mergeMap(() => this.service.loadSettings()),
            map(payload => settingsLoaded({ settings: payload })),
        ),
    )

    updateSettings$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(SettingsActionTypes.updateSettings),
            mergeMap(action => this.service.updateSettings(action.settings.changes)),
            pipe(
              switchMap((payload: any) => {
                return [
                  showSuccess({
                    notification: new UserNotification({
                      title: 'Successfully updated',
                      message: 'Accounts settings updated sucessfully.',
                    }),
                  })
                ]
              }),
            ),
          ),
        { dispatch: true },
      )
    constructor(private actions$: Actions, private service: FileService) { }
}

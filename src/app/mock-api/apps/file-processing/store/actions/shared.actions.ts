import { createAction, props } from '@ngrx/store'
import { UserNotification } from 'app/shared/models/user-notification.model'


/// UI

export const showSuccess = createAction(
  '[API Service] Show success',
  props<{ notification: UserNotification }>(),
)
export const showError = createAction(
  '[API Service] Show error',
  props<{ notification: UserNotification }>(),
)
export const showInfo = createAction(
  '[API Service] Show information',
  props<{ notification: UserNotification }>(),
)
export const showWarning = createAction(
  '[API Service] Show warning',
  props<{ notification: UserNotification }>(),
)
export const markAsRead = createAction(
  '[UI] Mark as read',
  props<{ notification: UserNotification }>(),
)

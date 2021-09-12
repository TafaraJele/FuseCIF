import { createAction, props } from '@ngrx/store'
import { Customer } from 'app/shared/models/customer.model'


// Fetch data requests
export const loadBatchCustomers = createAction('[Customers resolver] Load customers per batch', props<{ fileBatchNumber: string }>())
export const batchCustomersLoaded = createAction(
  '[Customers service] Customers per batch loaded',
  props<{ customers: Customer[] }>(),
)
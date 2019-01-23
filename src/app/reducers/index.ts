import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';

import {BuildingsReducers, BuildingsState} from '../dashboard/main/buildings/store/building-list.reducer';
import {RoomsReducers, RoomsState} from '../dashboard/main/rooms/store/rooms.reducers';
import {AuthReducers, AuthState} from '../../app/auth/signup/store/signup.reducers';
import {CustomersReducers, CustomersState} from '../dashboard/main/customers/store/customers.reducers';
import {ReportsReducers, ReportsState} from '../dashboard/main/reports/store/reports.reducers';

export interface AppState {
  auth: AuthState;
  buildings: BuildingsState;
  rooms: RoomsState;
  customers: CustomersState;
  reports: ReportsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducers,
  buildings: BuildingsReducers,
  rooms: RoomsReducers,
  customers: CustomersReducers,
  reports: ReportsReducers,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

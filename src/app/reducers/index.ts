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

export interface AppState {
  buildings: BuildingsState;
  rooms: RoomsState;
  customers: CustomersState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  buildings: BuildingsReducers,
  rooms: RoomsReducers,
  customers: CustomersReducers,
  auth: AuthReducers
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

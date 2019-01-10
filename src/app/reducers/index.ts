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
export interface AppState {
  buildings: BuildingsState;
  rooms: RoomsState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  buildings: BuildingsReducers,
  rooms: RoomsReducers,
  auth: AuthReducers
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

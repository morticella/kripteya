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
export interface AppState {
  buildings: BuildingsState;
  rooms: RoomsState;
}

export const reducers: ActionReducerMap<AppState> = {
  buildings: BuildingsReducers,
  rooms: RoomsReducers
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

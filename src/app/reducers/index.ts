import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';

import {BuildingsReducers, BuildingsState} from '../dashboard/main/buildings/store/building-list.reducer';

export interface AppState {
  buildings: BuildingsState;
}

export const reducers: ActionReducerMap<AppState> = {
  buildings: BuildingsReducers
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

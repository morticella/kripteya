import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BuildingsState } from './building-list.reducer';

import * as fromBuildings from './building-list.reducer';

export const selectBuildingState = createFeatureSelector<BuildingsState>('buildings');

export const selectBuildingById = (ids: number) => createSelector(
  selectBuildingState,
  fullBuildingsState => fullBuildingsState.entities[ids]
);


export const selectAllBuildings = createSelector(
  selectBuildingState,
  fromBuildings.selectAll

);



import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BuildingsState } from './building-list.reducer';




export const selectBuildingState = createFeatureSelector<BuildingsState>('buildings');

export const selectBuildingById = (ids: string) => createSelector(
  selectBuildingState,
  fullBuildingsState => fullBuildingsState.entities[ids]
);


export const selectAllBuildings = createSelector(
  selectBuildingState,

    buildings => {
        const allBuildings = Object.values(buildings.entities);
        return allBuildings;
    }


);



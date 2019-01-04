import {Action} from '@ngrx/store';
import { Building } from '../../../../shared/models/building.model';

export const ADD_BUILDING = 'ADD_BUILDING';
export const ADD_BUILDING_FAILED = 'ADD_BUILDING_FAILED';
export const ADD_BUILDING_SUCCESS = 'ADD_BUILDING_SUCCESS';
export const LOADING_BUILDINGS = 'LOADING_BUILDINGS';
export const LOADING_BUILDINGS_SUCCESS = 'LOADING_BUILDINGS_SUCCESS';

export class AddBuilding implements Action {

  readonly type = ADD_BUILDING;
  constructor(public payload: Building) {}

}
export class AddBuildingFailed implements Action {

  readonly type = ADD_BUILDING_FAILED;
  constructor(public error: boolean) {}

}
export class AddBuildingSuccess implements Action {
  readonly type = ADD_BUILDING_SUCCESS;
  constructor(public payload: Building) {}

}
export class LoadingBuildings implements Action {
  readonly type = LOADING_BUILDINGS;

}

export class SuccessBuilding implements Action {
  readonly type = LOADING_BUILDINGS_SUCCESS;
  constructor(public payload: Building[]) {}
}

export type BuildingsListAction =
              SuccessBuilding |
              AddBuilding |
              LoadingBuildings |
              AddBuildingSuccess |
              AddBuildingFailed;

import {Action} from '@ngrx/store';
import { Building } from '../../../../shared/models/building.model';

export const ADD_BUILDING = 'ADD_BUILDING';
export const ADDED_BUILDING = 'ADD_BUILDING';
export const LOADING_BUILDINGS = 'LOADING_BUILDINGS';
export const SUCCESS_BUILDING = 'SUCCESS_BUILDING';

export class AddBuilding implements Action {

  readonly type = ADD_BUILDING;
  constructor(public payload: Building) {}

}
export class AddedBuilding implements Action {
  readonly type = ADDED_BUILDING;
  // constructor(public payload: Building) {}

}
export class LoadingBuildings implements Action {
  readonly type = LOADING_BUILDINGS;

}

export class SuccessBuilding implements Action {
  readonly type = SUCCESS_BUILDING;
  constructor(public payload: Building[]) {}
}

export type BuildingsListAction =
              SuccessBuilding |
              AddBuilding |
              LoadingBuildings |
              AddedBuilding;

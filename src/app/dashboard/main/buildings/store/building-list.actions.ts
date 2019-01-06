import {Action} from '@ngrx/store';
import { Building } from '../../../../shared/models/building.model';

export enum BuildingsActionTypes {
  AddBuilding = '[Add New Building] Building Required',
  AddBuildingSuccess = '[Buildings API] Add New Building Success',
  AddBuildingFailed = '[Buildings API] Add New Building Failed',
  LoadingBuildings = '[Load All Buildings] Buildings Required',
  LoadingBuildingsSuccess = '[Buildings API] Loading Buildings Success',
  LoadingBuildingsFailed = '[Buildings API] Loading Buildings Failed'
}

export class AddBuilding implements Action {
  readonly type = BuildingsActionTypes.AddBuilding;
  constructor(public payload: Building) {}

}
export class AddBuildingFailed implements Action {

  readonly type = BuildingsActionTypes.AddBuildingFailed;
  constructor(public error: boolean) {}

}
export class AddBuildingSuccess implements Action {
  readonly type = BuildingsActionTypes.AddBuildingSuccess;
  constructor(public payload: Building) {}

}
export class LoadingBuildings implements Action {
  readonly type = BuildingsActionTypes.LoadingBuildings;
  // constructor(public payload: { buildings: Building[]}) {}

}

export class LoadingBuildingsSuccess implements Action {
  readonly type = BuildingsActionTypes.LoadingBuildingsSuccess;
  constructor(public payload: { buildings: Building[]}) {}
}
export class LoadingBuildingsFailed implements Action {
  readonly type = BuildingsActionTypes.LoadingBuildingsFailed;
  constructor(public error: boolean) {}
}

export type BuildingsListAction =
              LoadingBuildings |
              LoadingBuildingsSuccess |
              LoadingBuildingsFailed |
              AddBuilding |
              AddBuildingSuccess |
              AddBuildingFailed ;

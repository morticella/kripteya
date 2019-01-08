import {Action} from '@ngrx/store';
import { Building } from '../../../../shared/models/building.model';

export enum BuildingsActionTypes {
  AddBuilding = '[Add New Building] Building Request',
  AddBuildingSuccess = '[Buildings API] Add New Building Success',
  AddBuildingFailed = '[Buildings API] Add New Building Failed',
  LoadingBuildings = '[Load All Buildings] Buildings Request',
  LoadingBuildingsSuccess = '[Buildings API] Loading Buildings Success',
  LoadingBuildingsFailed = '[Buildings API] Loading Buildings Failed',
  DeleteBuilding = '[Delete Building] Building Request',
  DeleteBuildingSuccess = '[Buildings API] Delete Building Success',
  DeleteBuildingFailed = '[Buildings API] Delete Building Failed',
}


export class LoadingBuildings implements Action {
  readonly type = BuildingsActionTypes.LoadingBuildings;
}

export class LoadingBuildingsSuccess implements Action {
  readonly type = BuildingsActionTypes.LoadingBuildingsSuccess;
  constructor(public payload: { buildings: Building[]}) {}
}
export class LoadingBuildingsFailed implements Action {
  readonly type = BuildingsActionTypes.LoadingBuildingsFailed;
  constructor(public error: boolean) {}
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

export class DeleteBuilding implements Action {
  readonly type = BuildingsActionTypes.DeleteBuilding;
  constructor(public payload:  string ) {}
}

export class DeleteBuildingSuccess implements Action {
  readonly type = BuildingsActionTypes.DeleteBuildingSuccess;
  constructor(public payload:  string ) {}
}
export class DeleteBuildingFailed implements Action {
  readonly type = BuildingsActionTypes.DeleteBuildingFailed;
  constructor(public error: boolean) {}
}

export type BuildingsListAction =
              LoadingBuildings |
              LoadingBuildingsSuccess |
              LoadingBuildingsFailed |
              AddBuilding |
              AddBuildingSuccess |
              AddBuildingFailed |
              DeleteBuilding |
              DeleteBuildingSuccess |
              DeleteBuildingFailed;

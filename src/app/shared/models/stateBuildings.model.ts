import {Building} from './building.model';

export interface StateBuildings {
  buildings?: Building[];
  building: any;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

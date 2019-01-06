import {BuildingsActionTypes} from './building-list.actions';
import {Building} from '../../../../shared/models/building.model';

export interface BuildingsState {
  buildings: Building[];
  building: any;
  loading: boolean;
  logged: boolean;
  error: boolean;
}

export const initialState: BuildingsState = {
  buildings: [],
  building: null,
  loading: true,
  logged: false,
  error: false,
};

export function BuildingsReducers(state: BuildingsState = initialState, action): BuildingsState {
  switch (action.type) {
    case BuildingsActionTypes.LoadingBuildings: {
      const loading = true;
      const logged = false;
      const error = false;
      return {
      ...state,
      loading,
      logged,
      error,
    };
    }
    case BuildingsActionTypes.LoadingBuildingsFailed: {
      const loading = false;
      const logged = true;
      const error = action.error;
      return {
      ...state,
      loading,
      logged,
      error
    };
  }
    case BuildingsActionTypes.LoadingBuildingsSuccess: {
      const buildings = action.payload;
      const loading = false;
      const logged = true;
      const error = false;
      return {
      ...state,
      buildings,
      loading,
      logged,
      error
    };
    }
    case BuildingsActionTypes.AddBuilding: {
      const loading = true;
      const logged = false;
      const error = false;
      return {
      ...state,
      loading,
      logged,
      error
    };
  }
  case BuildingsActionTypes.AddBuildingFailed: {
    const error = action.error;
    const loading = false;
    const logged = true;
    return {
    ...state,
    loading,
    logged,
    error
  };
}
  case BuildingsActionTypes.AddBuildingSuccess: {
    const loading = false;
    const logged = true;
    const error = false;
    const building = action.payload;
    return {
    ...state,
    building,
    loading,
    logged,
    error,
  };
}
    default: return state;
}
}

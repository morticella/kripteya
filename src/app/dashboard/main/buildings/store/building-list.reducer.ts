import * as BuildingsListReducers from './building-list.actions';
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
    case BuildingsListReducers.LOADING_BUILDINGS_SUCCESS: {
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

    case BuildingsListReducers.ADD_BUILDING: {
      // const building = action.payload;
      // console.log('payload', building);
      const loading = true;
      const logged = false;
      const error = false;
      return {
      ...state,
      // building,
      loading,
      logged,
      error
    };
  }
  case BuildingsListReducers.ADD_BUILDING_FAILED: {
    // const building = action.payload;
    // console.log('payload', building);
    const error = action.error;
    const loading = false;
    const logged = true;
    return {
    ...state,
    // building,
    loading,
    logged,
    error
  };
}
  case BuildingsListReducers.ADD_BUILDING_SUCCESS: {
    // const building = action.payload;
    // console.log('ADDED ') ;
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
    case BuildingsListReducers.LOADING_BUILDINGS: {
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
    default: return state;
}
}

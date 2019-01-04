import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { Building } from '../../app/shared/models/building.model';
import { environment } from '../../environments/environment';
import * as BuildingsListReducers from '../dashboard/main/buildings/store/building-list.actions';

const initialState: BuildingsState = {
  buildings: [],
  building: null,
  loading: true,
  logged: false,
  error: false,
};


interface BuildingsState {
  buildings: Building[];
  building: any;
  loading: boolean;
  logged: boolean;
  error: boolean;
}


export interface AppState {
  buildings: BuildingsState;

}

function AppReducers(state: BuildingsState = initialState, action): BuildingsState {
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

export const reducers: ActionReducerMap<AppState> = {
  buildings: AppReducers
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

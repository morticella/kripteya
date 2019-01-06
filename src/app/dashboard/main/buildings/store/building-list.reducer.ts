import {BuildingsActionTypes} from './building-list.actions';
import {Building} from '../../../../shared/models/building.model';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface BuildingsState extends EntityState<Building> {
  allBuildings: boolean;
  // ids: string[];
  entities: {[ids: string]: Building};
  building: any;
  loading: boolean;
  logged: boolean;
  error: boolean;
}

export const adapter: EntityAdapter<Building> =
  createEntityAdapter<Building>();


export const initialState: BuildingsState = adapter.getInitialState({
  allBuildings: false,
  // ids: [],
  entities: {},
  building: null,
  loading: false,
  logged: true,
  error: false
});

export function BuildingsReducers(state: BuildingsState = initialState, action): BuildingsState {
  switch (action.type) {
    case BuildingsActionTypes.LoadingBuildings: {
      const loading = true;
      const logged = false;
      const error = false;
      return  {
      ...state,
      // allBuildings: false,
      // buildings: true,
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
      // const buildings = action.payload;
      const loading = false;
      const logged = true;
      const error = false;

 const allLoadedBuildings = action.payload;
      // return adapter.addAll(action.payload, {
      //   ...state,
      //   allBuildings: true,
      //   loading,
      //   logged,
      //   error,
      //   // ids,
      //   entities: allLoadedBuildings,
      //   ids: allLoadedBuildings._id

      // });
      const ids = [];
      for (const id of action.payload) {
        ids.push(id._id);
      }

      return  {
        ...state,
        allBuildings: true,
        entities:  {allLoadedBuildings},
        ids,
        loading,
        logged,
        error,
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

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

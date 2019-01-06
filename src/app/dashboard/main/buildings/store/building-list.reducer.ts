import {BuildingsActionTypes} from './building-list.actions';
import {Buildings} from '../../../../shared/models/buildings.model';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface BuildingsState extends EntityState<Buildings> {
  // allBuildings: boolean;
  // ids: string[];
  // buildings: {[_id: string]: Building};
  building: any;
  loading: boolean;
  logged: boolean;
  error: boolean;
}

export const adapter: EntityAdapter<Buildings> =
  createEntityAdapter<Buildings>({selectId: buildings => buildings._id});


export const initialState: BuildingsState = adapter.getInitialState({
  // allBuildings: false,
  // ids: [],
  // buildings: {} ,
  ids: [],
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

 // const allLoadedBuildings = action.payload;

      // const ids = [];
      // for (const id of action.payload) {
      //   ids.push(id._id);
      // }
      // return adapter.upsertMany(action.payload, {
      //   ...state,
      //   loading,
      //   logged,
      //   error,
      // });

      return adapter.addAll(action.payload,
        {
            ...state,
        loading,
        logged,
        error,
        });

      // return   {
      //   ...state,
      //   ids,

      //    buildings: allLoadedBuildings,
      //   loading,
      //   logged,
      //   error,
      // };
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

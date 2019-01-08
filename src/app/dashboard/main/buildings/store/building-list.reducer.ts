import {BuildingsActionTypes} from './building-list.actions';
import {Buildings} from '../../../../shared/models/buildings.model';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { Building } from 'src/app/shared/models/building.model';

export interface BuildingsState extends EntityState<Buildings> {

  building: any;
  loading: boolean;
  logged: boolean;
  error: boolean;
}

export const adapter: EntityAdapter<Buildings> =
  createEntityAdapter<Buildings>({selectId: buildings => buildings._id});


export const initialState: BuildingsState = adapter.getInitialState({

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

      const loading = false;
      const logged = true;
      const error = false;

      return adapter.addAll(action.payload,
        {
        ...state,
        loading,
        logged,
        error,
        });
    }



    case BuildingsActionTypes.AddBuilding: {
      const loading = true;
      const logged = false;
      const error = false;
      return  {
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
    return adapter.addOne(action.payload, {
    ...state,
    building,
    loading,
    logged,
    error,
  });
}

case BuildingsActionTypes.DeleteBuilding: {
  const loading = true;
  const logged = false;
  const error = false;
  return  {
  ...state,
  loading,
  logged,
  error
  };
}
case BuildingsActionTypes.DeleteBuildingFailed: {
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

case BuildingsActionTypes.DeleteBuildingSuccess: {
  const loading = false;
  const logged = true;
  const error = false;
  const id = action.payload;
  return adapter.removeOne(action.payload, {
  ...state,
  id,
  loading,
  logged,
  error,
});
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

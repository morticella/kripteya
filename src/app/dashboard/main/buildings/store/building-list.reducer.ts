import {BuildingsActionTypes} from './building-list.actions';
import {Buildings} from '../../../../shared/models/buildings.model';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface BuildingsState extends EntityState<Buildings> {
  entities: {};
  building: any;
  editBuilding: any;
  id: string;
  loading: boolean;
  error: boolean;
}

export const adapter: EntityAdapter<Buildings> =
  createEntityAdapter<Buildings>({selectId: buildings => buildings._id});

export const initialState: BuildingsState = adapter.getInitialState({
  entities: {},
  editBuilding: null,
  id: null,
  building: null,
  loading: false,
  error: false
});

export function BuildingsReducers(state: BuildingsState = initialState, action): BuildingsState {
  switch (action.type) {
    case BuildingsActionTypes.LoadingBuildings: {
      const loading = true;
      const error = false;
      return  {
      ...state,
      loading,
      error,
    };
    }
    case BuildingsActionTypes.LoadingBuildingsFailed: {
      const loading = false;
      const error = action.error;
      return {
      ...state,
      loading,
      error
    };
  }
    case BuildingsActionTypes.LoadingBuildingsSuccess: {
      const loading = false;
      const error = false;
      return adapter.addAll(action.payload,
        {
        ...state,
        loading,
        error,
        });
    }

    case BuildingsActionTypes.AddBuilding: {
      const loading = true;
      const error = false;
      return  {
      ...state,
      loading,
      error
    };
  }
    case BuildingsActionTypes.AddBuildingFailed: {
      const error = action.error;
      const loading = false;
      return {
      ...state,
      loading,
      error
    };
  }
    case BuildingsActionTypes.AddBuildingSuccess: {
      const loading = false;
      const error = false;
      const building = action.payload;
      return adapter.addOne(action.payload, {
      ...state,
      building,
      loading,
      error,
    });
  }

  case BuildingsActionTypes.DeleteBuilding: {
    const loading = true;
    const error = false;
    return  {
    ...state,
    loading,
    error
    };
  }
  case BuildingsActionTypes.DeleteBuildingFailed: {
    const error = action.error;
    const loading = false;
    return {
    ...state,
    loading,
    error
    };
  }

  case BuildingsActionTypes.DeleteBuildingSuccess: {
    const loading = false;
    const error = false;
    const id = action.payload;
    return adapter.removeOne(action.payload, {
    ...state,
    id,
    loading,
    error,
  });
  }

  case BuildingsActionTypes.EditBuilding: {
    const loading = true;
    const error = false;
    const id = action.payload.id;
    const editBuilding = state.entities[action.payload.id];
    return  {
    ...state,
    ...state.entities[action.payload.id],
    editBuilding,
    id,
    loading,
    error
    };
  }
  case BuildingsActionTypes.EditBuildingFailed: {
    const error = action.error;
    const loading = false;
    return {
    ...state,
    loading,
    error
    };
  }

  case BuildingsActionTypes.EditBuildingSuccess: {
    const loading = false;
    const error = false;
    const id = action.payload.id;
    state.entities[id].nameBuilding = action.payload.nameBuilding;
    state.entities[id].address = action.payload.address;
    state.entities[id].info = action.payload.info;
    // const nameBuilding;
    // console.log(state.entities[id].building.nameBuilding);
    return adapter.updateOne(action.payload, {
    ...state,
    ...state.entities[id].nameBuilding,
    ...state.entities[id].address,
    ...state.entities[id].info,
    id,
    loading,
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

import {RoomsActionTypes} from './rooms.actions';
import {Rooms} from '../../../../shared/models/rooms.model';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface RoomsState extends EntityState<Rooms> {
  entities: {};
  Room: any;
  editRoom: any;
  id: string;
  loading: boolean;
  error: boolean;
}

export const adapter: EntityAdapter<Rooms> =
  createEntityAdapter<Rooms>({selectId: rooms => rooms._id});


export const initialState: RoomsState = adapter.getInitialState({
  entities: {},
  editRoom: null,
  id: null,
  Room: null,
  loading: false,
  error: false
});

export function RoomsReducers(state: RoomsState = initialState, action): RoomsState {
  switch (action.type) {
    case RoomsActionTypes.LoadingRooms: {
      const loading = true;
      const error = false;
      return  {
      ...state,
      loading,
      error,
    };
    }
    case RoomsActionTypes.LoadingRoomsFailed: {
      const loading = false;
      const error = action.error;
      return {
      ...state,
      loading,
      error
    };
  }
    case RoomsActionTypes.LoadingRoomsSuccess: {
      const loading = false;
      const error = false;
      return adapter.addAll(action.payload,
        {
        ...state,
        loading,
        error,
        });
    }

    case RoomsActionTypes.AddRoom: {
      const loading = true;
      const error = false;
      return  {
      ...state,
      loading,
      error
    };
  }
  case RoomsActionTypes.AddRoomFailed: {
    const error = action.error;
    const loading = false;
    return {
    ...state,
    loading,
    error
  };
}
  case RoomsActionTypes.AddRoomSuccess: {
    const loading = false;
    const error = false;
    const room = action.payload;
    return adapter.addOne(action.payload, {
    ...state,
    room,
    loading,
    error,
  });
}

case RoomsActionTypes.DeleteRoom: {
  const loading = true;
  const error = false;
  return  {
  ...state,
  loading,
  error
  };
}
case RoomsActionTypes.DeleteRoomFailed: {
  const error = action.error;
  const loading = false;
  return {
  ...state,
  loading,
  error
  };
}

case RoomsActionTypes.DeleteRoomSuccess: {
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

case RoomsActionTypes.EditRoom: {
  const loading = true;
  const error = false;
  const id = action.payload.id;
  const editRoom = state.entities[action.payload.id];
  return  {
  ...state,
  editRoom,
  id,
  loading,
  error
  };
}
case RoomsActionTypes.EditRoomFailed: {
  const error = action.error;
  const loading = false;
  return {
  ...state,
  loading,
  error
  };
}

case RoomsActionTypes.EditRoomSuccess: {
  const loading = false;
  const error = false;
  const id = action.payload.id;

  return adapter.updateOne(action.payload, {
  ...state,
  ...state.entities[id].name = action.payload.name,
  ...state.entities[id].gender = action.payload.gender,
  ...state.entities[id].idBuilding = action.payload.idBuilding,
  ...state.entities[id].beds = action.payload.beds,
  ...state.entities[id].rent = action.payload.rent,
  ...state.entities[id].deposit = action.payload.deposit,
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

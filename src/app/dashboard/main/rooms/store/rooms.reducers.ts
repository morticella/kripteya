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
  deleteControl: Function;
  addNewControl: Function;
}

export const adapter: EntityAdapter<Rooms> =
  createEntityAdapter<Rooms>({selectId: rooms => rooms._id});


export const initialState: RoomsState = adapter.getInitialState({
  entities: {},
  ids: [],
  editRoom: null,
  id: null,
  Room: null,
  loading: false,
  error: false,
  deleteControl: (idRoom: string, stateControl: string) => {
    if (stateControl) {
      return stateControl.includes(idRoom);
    }
  },
  addNewControl: (idRoom: string, stateControl: string) =>  {
    const regex = new RegExp(idRoom, 'gi');
    if (stateControl) {
      return (stateControl.match(regex) || []).length;
    }
  }
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
  const name = state.entities[id].name = action.payload.name;
  const gender = state.entities[id].gender = action.payload.gender;
  const idBuilding = state.entities[id].idBuilding = action.payload.idBuilding;
  const beds = state.entities[id].beds = action.payload.beds;
  const rent = state.entities[id].rent = action.payload.rent;
  const deposit = state.entities[id].deposit = action.payload.deposit;
  return adapter.updateOne(action.payload, {
  ...state,
  name,
  gender,
  idBuilding,
  beds,
  rent,
  deposit,
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

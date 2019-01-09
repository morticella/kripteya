import {Action} from '@ngrx/store';

import {Room} from '../../../../shared/models/room.model';

export enum RoomsActionTypes {
  AddRoom = '[Add New Room] Room Request',
  AddRoomSuccess = '[Rooms API] Add New Room Success',
  AddRoomFailed = '[Rooms API] Add New Room Failed',
  LoadingRooms = '[Load All Rooms] Rooms Request',
  LoadingRoomsSuccess = '[Rooms API] Loading Rooms Success',
  LoadingRoomsFailed = '[Rooms API] Loading Rooms Failed',
  DeleteRoom = '[Delete Room] Room Request',
  DeleteRoomSuccess = '[Rooms API] Delete Room Success',
  DeleteRoomFailed = '[Rooms API] Delete Room Failed',
  EditRoom = '[Edit Room] Room Request',
  EditRoomSuccess = '[Rooms API] Edit Room Success',
  EditRoomFailed = '[Rooms API] Edit Room Failed',
}


export class LoadingRooms implements Action {
  readonly type = RoomsActionTypes.LoadingRooms;
}

export class LoadingRoomsSuccess implements Action {
  readonly type = RoomsActionTypes.LoadingRoomsSuccess;
  constructor(public payload: { Rooms: Room[]}) {}
}
export class LoadingRoomsFailed implements Action {
  readonly type = RoomsActionTypes.LoadingRoomsFailed;
  constructor(public error: boolean) {}
}

export class AddRoom implements Action {
  readonly type = RoomsActionTypes.AddRoom;
  constructor(public payload: Room) {}

}
export class AddRoomFailed implements Action {

  readonly type = RoomsActionTypes.AddRoomFailed;
  constructor(public error: boolean) {}

}
export class AddRoomSuccess implements Action {
  readonly type = RoomsActionTypes.AddRoomSuccess;
  constructor(public payload: Room) {}

}

export class DeleteRoom implements Action {
  readonly type = RoomsActionTypes.DeleteRoom;
  constructor(public payload:  string ) {}
}

export class DeleteRoomSuccess implements Action {
  readonly type = RoomsActionTypes.DeleteRoomSuccess;
  constructor(public payload:  string ) {}
}
export class DeleteRoomFailed implements Action {
  readonly type = RoomsActionTypes.DeleteRoomFailed;
  constructor(public error: boolean) {}
}

export class EditRoom implements Action {
  readonly type = RoomsActionTypes.EditRoom;
  constructor(public payload:  any ) {}
}

export class EditRoomSuccess implements Action {
  readonly type = RoomsActionTypes.EditRoomSuccess;
  constructor(public payload:  any ) {}
}
export class EditRoomFailed implements Action {
  readonly type = RoomsActionTypes.EditRoomFailed;
  constructor(public error: boolean) {}
}

export type RoomsListAction =
              LoadingRooms |
              LoadingRoomsSuccess |
              LoadingRoomsFailed |
              AddRoom |
              AddRoomSuccess |
              AddRoomFailed |
              DeleteRoom |
              DeleteRoomSuccess |
              DeleteRoomFailed |
              EditRoom |
              EditRoomSuccess |
              EditRoomFailed;

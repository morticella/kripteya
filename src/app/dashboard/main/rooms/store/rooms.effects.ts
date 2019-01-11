import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, skip, catchError, tap, mergeMap, mapTo} from 'rxjs/operators';
import { of } from 'rxjs';

import { RoomsActionTypes } from '../store/rooms.actions';
import * as RoomsActions from '../store/rooms.actions';
import { Room } from '../../../../shared/models/room.model';

@Injectable()
export class RoomEffects {
  urlBackEnd = 'http://localhost:3000';
  newRoom: Room;
  error = 0;
  id: string;
  @Effect()
 loadRooms$ = this.actions$
 .pipe(ofType<RoomsActions.LoadingRooms>(RoomsActionTypes.LoadingRooms), mergeMap( () => {
  return this.http.get<any>(this.urlBackEnd + '/api/rooms').pipe(
    map(
      data => new RoomsActions.LoadingRoomsSuccess(data)
    ),
    catchError(
      () => of(new RoomsActions.LoadingRoomsFailed(true))
    ));
  }));
  @Effect()
 AddRoom$ = this.actions$
 .pipe(ofType<RoomsActions.AddRoom>(RoomsActionTypes.AddRoom),
 switchMap(
   (action: RoomsActions.AddRoom) => {
   this.newRoom = action.payload;
   this.error = 0;
    return this.http.post<Room>(this.urlBackEnd + '/api/new-room', this.newRoom)
    .pipe(
    map(
       () => new RoomsActions.AddRoomSuccess(this.newRoom),
    ),
    tap(
      () => this.router.navigate(['dashboard/buildings'])
    ),
    catchError(
      () =>  of(new RoomsActions.AddRoomFailed(true))
    ));
  }));
  @Effect()
  DeleteRoom$ = this.actions$
  .pipe(ofType<RoomsActions.DeleteRoom>(RoomsActionTypes.DeleteRoom),
  switchMap(
    (action: RoomsActions.DeleteRoom) => {
    this.id = action.payload; this.error = 0;
     return this.http.delete<Room>(this.urlBackEnd + '/api/new-room/' + this.id)
     .pipe(
     map(
        () => new RoomsActions.DeleteRoomSuccess(this.id),
     ),
     catchError(
       () =>  of(new RoomsActions.DeleteRoomFailed(true))
     ));
   }));
  @Effect()
  EditRoom$ = this.actions$
  .pipe(ofType<RoomsActions.EditRoom>(RoomsActionTypes.EditRoom), tap( ),
  mergeMap(
    (action: RoomsActions.EditRoom) => {
    const id = action.payload.id;
    this.newRoom = action.payload;
     return this.http.put<Room>(this.urlBackEnd + '/api/new-room/' + id, this.newRoom)
     .pipe(
     map(
      () => new RoomsActions.EditRoomSuccess(this.newRoom),
     ),
     tap(
      () => this.router.navigate(['dashboard/buildings'])
    ),
     catchError(
       () =>  of(new RoomsActions.EditRoomFailed(true))
     ));
   }));
 constructor(
   private actions$: Actions,
   private http: HttpClient,
   private router: Router) {}

}

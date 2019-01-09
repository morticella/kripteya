
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';

import * as fromRooms from '../store/rooms.reducers';
import * as roomsAction from '../store/rooms.actions';
import { ActivatedRoute } from '@angular/router';
// import {selectAllRooms} from '../store/room-list.selectors';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent implements OnInit {
  idBuilding: string;

  constructor(
    private store: Store<fromRooms.RoomsState>,
    private route: ActivatedRoute
    ) {}

  roomsState$: Observable<fromRooms.RoomsState>;
  rooms: any;

  ngOnInit() {
    this.idBuilding = this.route.snapshot.params['idBuilding'];
    console.log(this.idBuilding);
    this.store.dispatch(new roomsAction.LoadingRooms());
    this.roomsState$ = this.store.select<fromRooms.RoomsState>('rooms');
    this.rooms = this.roomsState$;
  }
  onDelete(id: string) {
    this.store.dispatch(new roomsAction.DeleteRoom(id));
  }
}





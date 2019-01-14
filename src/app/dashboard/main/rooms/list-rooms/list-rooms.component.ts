
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';

import * as fromRooms from '../store/rooms.reducers';
import * as roomsAction from '../store/rooms.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent implements OnInit {
  idBuilding: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ) {}

  roomsState$: Observable<fromRooms.RoomsState>;
  rooms: any;
  check: number;
  checkRefresh: string | number ;
  stopRefresh = 0;

  ngOnInit() {
    this.idBuilding = this.route.snapshot.params['idBuilding'];
    this.roomsState$ = this.store.select<fromRooms.RoomsState>('rooms');
    // this.rooms = this.roomsState$;
    this.store.select(roomsState => roomsState).subscribe(
        roomsState => {
         this.check = roomsState.rooms.ids.length;
          if (this.check === 0 && this.stopRefresh === 0) {
            this.stopRefresh = 1;
            this.store.dispatch(new roomsAction.LoadingRooms());
           }
        });
  }
  onDelete(id: string) {
    this.store.dispatch(new roomsAction.DeleteRoom(id));
  }
}





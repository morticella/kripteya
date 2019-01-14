
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

  roomsState$: Observable<AppState>;
  rooms: any;
  check: number;
  checkRefresh: string | number ;
  stopRefresh = 0;

  ngOnInit() {
    this.idBuilding = this.route.snapshot.params['idBuilding'];
    // this.store.dispatch(new roomsAction.LoadingRooms());
    this.roomsState$ = this.store.select<AppState>('rooms');
    this.rooms = this.roomsState$;



    // this.buildingsState$ = this.store.select<fromBuildings.BuildingsState>('buildings');
    this.store.select(buildingsState => buildingsState).subscribe(
        buildingsState => {
         this.check = buildingsState.rooms.ids.length;
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





import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
// import {switchMap, map, take} from 'rxjs/operators';

import * as fromBuildings from '../store/building-list.reducer';
import * as buildingsAction from '../store/building-list.actions';

import * as roomsActions from '../../rooms/store/rooms.actions';
import * as fromRooms from '../../rooms/store/rooms.reducers';
import { AppState } from 'src/app/reducers';
// import { pipe } from '@angular/core/src/render3';
// import {selectAllBuildings} from '../store/building-list.selectors';

@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css'],
})

export class ListBuildingComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  buildingsState$: Observable<fromBuildings.BuildingsState>;
  roomsState$: Observable<fromRooms.RoomsState>;
  buildings: Object;
  check: number;
  // booleanControl: boolean;
  roomsStateJSON: Object;
  roomsStateString: string;
  stopRefresh = false;

  ngOnInit() {
    console.log('');
    this.buildingsState$ = this.store.select<fromBuildings.BuildingsState>('buildings');
    this.roomsState$ = this.store.select<fromRooms.RoomsState>('rooms');
    this.store.select(state => state).subscribe(
        state => {
         this.check = state.buildings.ids.length;
         this.roomsStateJSON = state.rooms.entities;
         this.roomsStateString = JSON.stringify(this.roomsStateJSON);
          if (this.check === 0 && this.stopRefresh === false) {
            this.stopRefresh = true;
            this.store.dispatch(new buildingsAction.LoadingBuildings());
            this.store.dispatch(new roomsActions.LoadingRooms());
           }
        });
  }

  deleteControl (idBuilding: string) {
    return this.roomsStateString.includes(idBuilding);
  }
  onDelete(id: string) {
    this.store.dispatch(new buildingsAction.DeleteBuilding(id));
  }
}

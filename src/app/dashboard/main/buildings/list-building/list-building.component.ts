import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';

import * as fromBuildings from '../store/building-list.reducer';
import * as buildingsAction from '../store/building-list.actions';

import * as roomsActions from '../../rooms/store/rooms.actions';
import * as fromRooms from '../../rooms/store/rooms.reducers';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css'],
})

export class ListBuildingComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) {}

  buildingsState$: Observable<fromBuildings.BuildingsState>;
  roomsState$: Observable<fromRooms.RoomsState>;
  allowedActionControl$: any;
  buildings: Object;
  roomsStateJSON: Object;
  roomsStateString: string;
  reloadRooms: number | string;
  reloadBuildings: number  | string;

  ngOnInit() {

    this.buildingsState$ = this.store.select<fromBuildings.BuildingsState>('buildings');
    this.roomsState$ = this.store.select<fromRooms.RoomsState>('rooms');
    this.allowedActionControl$ = this.store.select(appState => appState)
      .subscribe( appState => {
          this.reloadBuildings = appState.buildings.ids[0];
          this.reloadRooms = appState.rooms.ids[0];
          this.roomsStateJSON = appState.rooms.entities;
          this.roomsStateString = JSON.stringify(this.roomsStateJSON);
        });

    if (!this.reloadRooms) {
          this.store.dispatch(new roomsActions.LoadingRooms());
    }
    if (!this.reloadBuildings) {
          this.store.dispatch(new buildingsAction.LoadingBuildings());
    }
  }

  deleteControl (idBuilding: string) {
    if (this.roomsStateString) {
      return this.roomsStateString.includes(idBuilding);
    }
  }
  onDelete(id: string) {
    this.store.dispatch(new buildingsAction.DeleteBuilding(id));
  }
  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}

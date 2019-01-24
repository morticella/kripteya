import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import * as buildingsAction from '../store/building-list.actions';

import { StateService } from '../../../../service/state.service';

@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css'],
})

export class ListBuildingComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>,
              private stateService: StateService) {}

  buildingsState$: Object;
  roomsState$: Object;
  allowedActionControl$: any;

  ngOnInit() {

    this.buildingsState$ = this.stateService.buildingsState$;
    this.roomsState$ = this.stateService.roomsState$;
    this.allowedActionControl$ = this.stateService.allowedActionControl$
      .subscribe( appState => {
          const roomsStateJSON = appState.rooms.entities;
          this.stateService.roomsStateString = JSON.stringify(roomsStateJSON);
        });

    this.stateService.reloadControl();
  }

  deleteControl (idBuilding: string) {
    if (this.stateService.roomsStateString) {
      return this.stateService.roomsStateString.includes(idBuilding);
    }
  }
  onDelete(id: string) {
    this.store.dispatch(new buildingsAction.DeleteBuilding(id));
  }
  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}

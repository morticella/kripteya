import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import * as roomsAction from '../store/rooms.actions';
import { StateService } from '../../../../service/state.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent implements OnInit, OnDestroy {

  allowedActionControl$: any;
  roomsState$: Object;
  idBuilding: string;
  nameBuilding: string;
  love: Object;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private stateService: StateService ) {}

  ngOnInit() {

    this.idBuilding = this.route.snapshot.params['idBuilding'];

    this.roomsState$ = this.stateService.roomsState$;
    this.allowedActionControl$ = this.stateService.allowedActionControl$.subscribe(
        appState => {
         if (this.stateService.reloadCustomers || this.stateService.reloadCustomers === 0) {
          const customersStateJSON = appState.customers.entities;
          this.stateService.customersStateString = JSON.stringify(customersStateJSON);
        }
        // if the users select view rooms from a building with this statment I will show the Rooms Building Name
        if (appState.buildings.entities[this.idBuilding]) {
          this.nameBuilding = appState.buildings.entities[this.idBuilding].nameBuilding;
        }

      });
      this.stateService.reloadControl();

  }
  onDelete(id: string) {
    this.store.dispatch(new roomsAction.DeleteRoom(id));
  }
  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }

}

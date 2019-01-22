import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';

import * as roomsAction from '../store/rooms.actions';
import * as buildingsAction from '../../buildings/store/building-list.actions';
import * as customersAction from '../../customers/store/customers.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ) {}

  allowedActionControl$: any;
  roomsState$: Observable<AppState>;
  roomsState: Object;
  customersStateJSON: Object;
  customersStateString: string;
  idBuilding: string;
  nameBuilding: string;
  reloadRooms: number | string;
  reloadBuildings: number  | string;
  reloadCustomers: number | string;

  ngOnInit() {
    this.idBuilding = this.route.snapshot.params['idBuilding'];

    this.roomsState$ = this.store.select<AppState>('rooms');
    this.roomsState = this.roomsState$;
    this.allowedActionControl$ = this.store.select(appState => appState).subscribe(
        appState => {
         this.reloadCustomers = appState.customers.ids[0];
         this.reloadBuildings = appState.buildings.ids[0];
         this.reloadRooms = appState.buildings.ids[0];
         if (this.reloadCustomers ) {
          this.customersStateJSON = appState.customers.entities;
          this.customersStateString = JSON.stringify(this.customersStateJSON);

        }
        // if the users select view rooms from a building with this statment I will show the Rooms Building Name
        if (appState.buildings.entities[this.idBuilding]) {
          this.nameBuilding = appState.buildings.entities[this.idBuilding].nameBuilding;

        }

      });

        if (!this.reloadRooms) {
          this.store.dispatch(new roomsAction.LoadingRooms());
        }
        if (!this.reloadBuildings) {
          this.store.dispatch(new buildingsAction.LoadingBuildings());
        }

        if (!this.reloadCustomers) {
          this.store.dispatch(new customersAction.LoadingCustomers());
        }

  }

  viewDeleteCustomerControl (idRoom: string) {
    if (this.customersStateString) {
      return this.customersStateString.includes(idRoom);
    }
  }
  newCustomerControl (idRoom: string) {
    const regex = new RegExp(idRoom, 'gi');
    if (this.customersStateString) {
      return (this.customersStateString.match(regex) || []).length;
    }
  }
  onDelete(id: string) {
    this.store.dispatch(new roomsAction.DeleteRoom(id));
  }
  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}

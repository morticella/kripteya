import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';

import * as fromRooms from '../store/rooms.reducers';
import * as roomsAction from '../store/rooms.actions';
import * as buildingsAction from '../../buildings/store/building-list.actions';
import * as customersAction from '../../customers/store/customers.actions';
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
  roomsState: Object;
  customersStateJSON: Object;
  customersStateString: string;
  addNewCustomerIsPossible: boolean;
  addNewCustomerIsPossibleEmpty: boolean;
  rooms: any;
  check: number;
  checkIdRoom: string;
  checkRefresh: string | number ;
  stopRefresh = 0;
  nameBuilding: string;
  reloadBuildings: number  | string;
  customers: number | string;
  results: number[] = [];

  ngOnInit() {
    this.idBuilding = this.route.snapshot.params['idBuilding'];

    this.roomsState$ = this.store.select<AppState>('rooms');
    this.roomsState = this.roomsState$;
    this.store.select(appState => appState).subscribe(
        appState => {
         this.check = appState.rooms.ids.length;
         this.customers = appState.customers.ids[0];
         if (this.customers) {
          this.customersStateJSON = appState.customers.entities;
          this.customersStateString = JSON.stringify(this.customersStateJSON);

         if (appState.buildings.entities[this.idBuilding]) {
          this.nameBuilding = appState.buildings.entities[this.idBuilding].nameBuilding;
         }
          if (this.check === 0 && this.stopRefresh === 0) {
            this.stopRefresh = 1;
            this.reloadBuildings = appState.buildings.ids[0];
            this.store.dispatch(new roomsAction.LoadingRooms());
           }
        }
      });

        if (!this.reloadBuildings) {
          this.store.dispatch(new buildingsAction.LoadingBuildings());
        }

        if (!this.customers) {
          this.store.dispatch(new customersAction.LoadingCustomers());
        }
  }

  viewCustomerControl (idRoom: string) {
    return this.customersStateString.includes(idRoom);
  }
  newCustomerControl (idRoom: string) {

  if (!this.customersStateString.includes(idRoom)) {
    return true;
   }
   const regex = new RegExp(idRoom, 'gi');
   return (this.customersStateString.match(regex) || []).length;

  }
  onDelete(id: string) {
    this.store.dispatch(new roomsAction.DeleteRoom(id));
  }
}

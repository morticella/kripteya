import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import * as reportsAction from '../dashboard/main/reports/store/reports.actions';
import * as roomsAction from '../dashboard/main/rooms/store/rooms.actions';
import * as buildingsAction from '../dashboard/main/buildings/store/building-list.actions';
import * as customersAction from '../dashboard/main/customers/store/customers.actions';
import * as fromRooms from '../dashboard/main/rooms/store/rooms.reducers';
import * as fromBuildings from '../dashboard/main/buildings/store/building-list.reducer';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private store: Store<AppState>) { }

  allowedActionControl$ = this.store.select(state => state);
  buildingsState$ = this.store.select<fromBuildings.BuildingsState>('buildings');
  roomsState$ = this.store.select<fromRooms.RoomsState>('rooms');
  customersState$ = this.store.select<AppState>('customers');
  reportsState$ = this.store.select<AppState>('reports');

  reloadBuildings: number |string;
  reloadRooms: number | string;
  reloadCustomers: number | string;
  reloadReports: number | string;

  roomsStateString: string;
  customersStateString: string;

  reloadControl() {
    if (!this.reloadReports && this.reloadReports !== 0) {
      this.store.dispatch(new reportsAction.LoadingReports());
      this.reloadReports = 0;
      console.log('RELOADING', this.reloadReports);
    }
    if (!this.reloadCustomers && this.reloadCustomers !== 0) {
      this.store.dispatch(new customersAction.LoadingCustomers());
      this.reloadCustomers = 0;
      console.log('RELOADING', this.reloadCustomers);
    }
    if (!this.reloadRooms && this.reloadRooms !== 0) {
      this.reloadRooms = 0;
      this.store.dispatch(new roomsAction.LoadingRooms());
      console.log('RELOADING', this.reloadRooms);
    }
    if (!this.reloadBuildings && this.reloadBuildings !== 0) {
      this.store.dispatch(new buildingsAction.LoadingBuildings());
      this.reloadBuildings = 0;
      console.log('RELOADING', this.reloadBuildings);
    }
  }
}

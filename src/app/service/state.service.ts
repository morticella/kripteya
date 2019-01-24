import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import * as reportsAction from '../dashboard/main/reports/store/reports.actions';
import * as roomsAction from '../dashboard/main/rooms/store/rooms.actions';
import * as buildingsAction from '../dashboard/main/buildings/store/building-list.actions';
import * as customersAction from '../dashboard/main/customers/store/customers.actions';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private store: Store<AppState>) { }

  allowedActionControl$ = this.store.select(state => state);
  buildingsState$ = this.store.select<AppState>('buildings');
  roomsState$ = this.store.select<AppState>('rooms');
  customersState$ = this.store.select<AppState>('customers');
  reportsState$ = this.store.select<AppState>('reports');

  reloadBuildings: number |string;
  reloadRooms: number | string;
  reloadCustomers: number | string;
  reloadReports: number | string;

  roomsStateString: string;

  reloadControl() {
    if (!this.reloadReports) {
      this.store.dispatch(new reportsAction.LoadingReports());
    }
    if (!this.reloadCustomers) {
      this.store.dispatch(new customersAction.LoadingCustomers());
    }
    if (!this.reloadRooms) {
          this.store.dispatch(new roomsAction.LoadingRooms());
    }
    if (!this.reloadBuildings) {
          this.store.dispatch(new buildingsAction.LoadingBuildings());
    }
  }
}

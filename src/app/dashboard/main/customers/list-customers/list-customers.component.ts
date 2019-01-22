import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';

import * as customersAction from '../store/customers.actions';
import * as roomsAction from '../../rooms/store/rooms.actions';
import * as buildingsAction from '../../buildings/store/building-list.actions';
import { AppState } from 'src/app/reducers';
import { CustomersState } from '../store/customers.reducers';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ) {}

  idRoom: string;
  customersState$: Observable<AppState>;
  allowedActionControl$: Observable<AppState> | any;
  customersState: Object;
  reloadRooms: number | string;
  reloadBuildings: number  | string;
  reloadCustomers: number | string;

  ngOnInit() {

    this.idRoom = this.route.snapshot.params['idRoom'];
    this.customersState$ = this.store.select<AppState>('customers');
    this.customersState = this.customersState$;
    this.allowedActionControl$ = this.store.select(state => state).subscribe(
        state => {
          this.reloadCustomers = state.customers.ids[0];
          this.reloadRooms = state.rooms.ids[0];
          this.reloadBuildings = state.buildings.ids[0];
        });
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

  onDelete(id: string) {
    this.store.dispatch(new customersAction.DeleteCustomer(id));
  }

  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}





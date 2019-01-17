import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// import * as fromRooms from '../../rooms/store/rooms.reducers';
// import * as fromCustomers from '../../buildings/store/building-list.reducer';
// import * as buildingsAction from '../../buildings/store/building-list.actions';
import * as roomsAction from '../../rooms/store/rooms.actions';


import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import {AppState} from '../../../../reducers/index';
import * as customersAction from '../store/customers.actions';
import * as fromCustomers from '../store/customers.reducers';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

    // errorHeadersStatus: Subscription;
  // errorClass: boolean;
  // nameInvalid: string;
  faVenus = faVenus;
  faMars = faMars;
  idRoom: string;
  idCustomer: string;
  reloadCustomers: Object;
  reloadRooms: Object;
  customersState$: Observable<fromCustomers.CustomersState>;
  @Input() room: any;

  editCustomer = new FormGroup({
    idCustomer: new FormControl(this.route.snapshot.params['idCustomer'], [Validators.required]),
    // idCustomer: new FormControl(null, [Validators.required]),
    name: new FormControl(null, Validators.required),
    rent: new FormControl( null, Validators.required),
    deposit: new FormControl( null, Validators.required),
    notice: new FormControl( null),
    booked: new FormControl( null),
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.idCustomer = this.route.snapshot.params['idCustomer'];
    console.log(this.idCustomer);
    // this.idRoom = this.route.snapshot.params['idRoom'];
    // this.idCustomer = this.route.snapshot.params['idCustomer'];
    // here 9 means undefined I don't know how it doesn't work with === undedined or !
    this.customersState$ = this.store.select<fromCustomers.CustomersState>('customers');
    this.store.select(appState => appState).subscribe(
      appState => {
        this.reloadRooms = appState.rooms.ids[0];
        this.reloadCustomers = appState.customers.ids[0];
        // this.findIdCustomer();
      }
    );

    if (!this.reloadRooms) {
      this.store.dispatch(new roomsAction.LoadingRooms());
    }
    if (!this.reloadCustomers) {
      this.store.dispatch(new customersAction.LoadingCustomers());
    }

    // if (this.idCustomer.length === 9) {
    //   this.findIdCustomer();
    // }
  }


  onSubmit(editCustomer: FormGroup) {
    // this.store.select<AppState[]>('customers');
    this.store.dispatch(new customersAction.EditCustomer(editCustomer.value));
  }

}

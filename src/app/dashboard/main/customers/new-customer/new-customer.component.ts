import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import * as fromRooms from '../../../../reducers/index';
import * as customersAction from '../store/customers.actions';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  errorHeadersStatus: Subscription;
  errorClass: boolean;
  nameInvalid: string;
  faVenus = faVenus;
  faMars = faMars;
  idRoom: string;
  idBuilding: string;
  @Input() room: any;

  newCustomer = new FormGroup({
    idRoom: new FormControl(this.route.snapshot.params['idRoom'], [Validators.required]),
    idBuilding: new FormControl(this.route.snapshot.params['idBuilding'], [Validators.required]),
    name: new FormControl(null, Validators.required),
    rent: new FormControl( null, Validators.required),
    deposit: new FormControl( null, Validators.required),
    notice: new FormControl( null),
    booked: new FormControl( null),
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRooms.AppState>) { }

  ngOnInit() {
    this.idRoom = this.route.snapshot.params['idRoom'];
    this.idBuilding = this.route.snapshot.params['idBuilding'];
    this.store.dispatch(new customersAction.LoadingCustomers());
  }

  onSubmit(newCustomer: FormGroup) {
    this.store.select<fromRooms.AppState[]>('customers');
    this.store.dispatch(new customersAction.AddCustomer(newCustomer.value));
  }

}

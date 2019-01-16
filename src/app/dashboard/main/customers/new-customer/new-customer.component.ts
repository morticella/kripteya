import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// import * as fromRooms from '../../rooms/store/rooms.reducers';
// import * as fromBuildings from '../../buildings/store/building-list.reducer';
// import * as buildingsAction from '../../buildings/store/building-list.actions';
import * as roomsAction from '../../rooms/store/rooms.actions';


import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import {AppState} from '../../../../reducers/index';
import * as customersAction from '../store/customers.actions';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  // errorHeadersStatus: Subscription;
  // errorClass: boolean;
  // nameInvalid: string;
  faVenus = faVenus;
  faMars = faMars;
  idRoom: string;
  idBuilding: string;
  reloadBuildings: Object;
  reloadRooms: Object;
  @Input() room: any;

  newCustomer = new FormGroup({
    idRoom: new FormControl(this.route.snapshot.params['idRoom'], [Validators.required]),
    idBuilding: new FormControl(null, [Validators.required]),
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

    this.store.dispatch(new customersAction.LoadingCustomers());

    this.idRoom = this.route.snapshot.params['idRoom'];
    this.idBuilding = this.route.snapshot.params['idBuilding'];
    // here 9 means undefined I don't know how it doesn't work with === undedined or !

    this.store.select(appState => appState).subscribe(
      appState => {
        this.reloadRooms = appState.rooms.ids[0];
        this.findIdBuilding();
      }
    );

    if (!this.reloadRooms) {
      this.store.dispatch(new roomsAction.LoadingRooms());
    }

    if (this.idBuilding.length === 9) {
      this.findIdBuilding();
    }
  }

  onSubmit(newCustomer: FormGroup) {
    this.store.select<AppState[]>('customers');
    this.store.dispatch(new customersAction.AddCustomer(newCustomer.value));
  }
  findIdBuilding() {
    this.store.select(roomsState => roomsState).subscribe(
          roomsState => this.idBuilding = roomsState.rooms.entities[this.idRoom].idBuilding
    );
    console.log(this.idBuilding);
  }
}

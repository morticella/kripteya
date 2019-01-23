import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as roomsAction from '../../rooms/store/rooms.actions';
import * as buildingsAction from '../../buildings/store/building-list.actions';
import * as reportsAction from '../../reports/store/reports.actions';
import * as customersAction from '../store/customers.actions';
import {AppState} from '../../../../reducers/index';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
// import { LoadingBuildings } from '../../buildings/store/building-list.actions';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit, OnDestroy {

  faVenus = faVenus;
  faMars = faMars;
  idBuilding: string;
  idRoom: string;
  nameBuilding: string;
  nameRoom: string;
  idCustomer: string;
  namePayment: string;
  amount: number;
  deposit: number;
  reloadBuildings: Object;
  reloadRooms: Object;
  reloadCustomers: Object;
  allowedActionControl$: any;
  // @Input() room: any;

  newCustomer = new FormGroup({
    idCustomer: new FormControl(this.route.snapshot.params['idCustomer'], [Validators.required]),
    idRoom: new FormControl(null, [Validators.required]),
    idBuilding: new FormControl(null, [Validators.required]),
    namePayment: new FormControl(null, [Validators.required]),
    now: new FormControl(new Date(), Validators.required),
    from: new FormControl(new Date(), Validators.required),
    to: new FormControl(new Date(Date.now() + (1000 * 60 * 60 * 24 * 14)), Validators.required),
    amount: new FormControl( null, Validators.required),
    deposit: new FormControl( null),
    info: new FormControl( null),
    type: new FormControl( 'checkin', Validators.required),
    paymentType: new FormControl(null, Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit() {
    // this.newCustomer.get('idBuilding').setValue('some value');
    this.store.dispatch(new customersAction.LoadingCustomers());
    this.idCustomer = this.route.snapshot.params['idCustomer'];

    // this.idRoom = this.route.snapshot.params['idRoom'];

    this.allowedActionControl$ = this.store.select(appState => appState).subscribe(
      appState => {
        this.reloadRooms = appState.rooms.ids[0];
        this.reloadBuildings = appState.buildings.ids[0];
        this.reloadCustomers = appState.customers.ids[0];
        if (this.reloadRooms && this.reloadCustomers && this.reloadBuildings) {
          this.idRoom = appState.customers.entities[this.idCustomer].idRoom;
          this.idBuilding = appState.customers.entities[this.idCustomer].idBuilding;
          this.namePayment = appState.customers.entities[this.idCustomer].name;
          this.amount = appState.customers.entities[this.idCustomer].rent;
          this.deposit = appState.customers.entities[this.idCustomer].deposit;
          if (this.idRoom && this.idBuilding) {
            this.nameRoom = appState.rooms.entities[this.idRoom].name;
            this.nameBuilding = appState.buildings.entities[this.idBuilding].nameBuilding;
          }

          console.log('name ', this.nameRoom);
        }
        if (this.idRoom && this.idBuilding && this.namePayment && this.amount && this.deposit) {
          this.newCustomer.get('idRoom').setValue(this.idRoom);
          this.newCustomer.get('idBuilding').setValue(this.idBuilding);
          this.newCustomer.get('namePayment').setValue(this.namePayment);
          this.newCustomer.get('amount').setValue(this.amount * 2);
          this.newCustomer.get('deposit').setValue(this.deposit);
        }
      }
    );


    if (!this.reloadCustomers) {
      this.store.dispatch(new buildingsAction.LoadingBuildings());
    }
    if (!this.reloadRooms) {
      this.store.dispatch(new roomsAction.LoadingRooms());
    }

    if (!this.reloadBuildings) {
      this.store.dispatch(new customersAction.LoadingCustomers());
    }

  }

  onSubmit(newCustomer: FormGroup) {
    this.store.select<AppState[]>('customers');
    this.store.dispatch(new reportsAction.AddReport(newCustomer.value));
  }
  ngOnDestroy () {
    this.allowedActionControl$.unsubscribe();
  }
}



import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../reducers/index';
import * as reportsAction from '../../reports/store/reports.actions';
import * as customersAction from '../store/customers.actions';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import { StateService } from 'src/app/service/state.service';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit, OnDestroy {

  faVenus = faVenus;
  faMars = faMars;
  nameBuilding: string;
  nameRoom: string;
  idCustomer: string;
  allowedActionControl$: any;

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
    private store: Store<AppState>,
    private stateService: StateService) { }

  ngOnInit() {
    this.store.dispatch(new customersAction.LoadingCustomers());
    this.idCustomer = this.route.snapshot.params['idCustomer'];
    this.allowedActionControl$ = this.stateService.allowedActionControl$.subscribe(
      appState => {
        if (appState.rooms.ids[0] && appState.buildings.ids[0] && appState.customers.ids[0]) {
          const idRoom = appState.customers.entities[this.idCustomer].idRoom;
          const idBuilding = appState.customers.entities[this.idCustomer].idBuilding;
          const namePayment = appState.customers.entities[this.idCustomer].name;
          const amount = appState.customers.entities[this.idCustomer].rent;
          const deposit = appState.customers.entities[this.idCustomer].deposit;
          if (idRoom && idBuilding) {
            this.nameRoom = appState.rooms.entities[idRoom].name;
            this.nameBuilding = appState.buildings.entities[idBuilding].nameBuilding;
          }
          if (idRoom && idBuilding && namePayment && amount && deposit) {
            this.newCustomer.get('idRoom').setValue(idRoom);
            this.newCustomer.get('idBuilding').setValue(idBuilding);
            this.newCustomer.get('namePayment').setValue(namePayment);
            this.newCustomer.get('amount').setValue(amount * 2);
            this.newCustomer.get('deposit').setValue(deposit);
          }
        }
      }
    );

    this.stateService.reloadControl();

  }

  onSubmit(newCustomer: FormGroup) {
    this.store.dispatch(new reportsAction.AddReport(newCustomer.value));
  }
  ngOnDestroy () {
    this.allowedActionControl$.unsubscribe();
  }
}



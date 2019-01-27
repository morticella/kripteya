import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import {AppState} from '../../../../reducers/index';
import * as customersAction from '../store/customers.actions';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import { StateService } from '../../../../service/state.service';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit, OnDestroy {

  faVenus = faVenus;
  faMars = faMars;
  idRoom: string;
  idBuilding: string;
  nameRoom: string;
  nameBuilding: string;
  allowedActionControl$: any;

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
    private store: Store<AppState>,
    private stateService: StateService) { }

  ngOnInit() {

    this.store.dispatch(new customersAction.LoadingCustomers());

    this.idRoom = this.route.snapshot.params['idRoom'];
    this.idBuilding = this.route.snapshot.params['idBuilding'];

    this.allowedActionControl$ = this.stateService.allowedActionControl$.subscribe(
      appState => {
        if (this.route.snapshot.params['idBuilding'] !== undefined) {
          if (appState.rooms.ids[0]) {
            this.idBuilding = appState.rooms.entities[this.idRoom].idBuilding;
          }
        }
        if (appState.rooms.ids[0] && appState.buildings.ids[0] && this.idBuilding) {
          this.nameBuilding = appState.buildings.entities[this.idBuilding].nameBuilding;
          this.nameRoom = appState.rooms.entities[this.idRoom].name;
        }
        if (this.nameBuilding && this.nameRoom) {
          this.newCustomer.get('rent').setValue(appState.rooms.entities[this.idRoom].rent);
          this.newCustomer.get('deposit').setValue(appState.rooms.entities[this.idRoom].deposit);
        }
      }
    );

    this.stateService.reloadControl();

  }

  onSubmit(newCustomer: FormGroup) {
    this.store.dispatch(new customersAction.AddCustomer(newCustomer.value));
  }

  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}

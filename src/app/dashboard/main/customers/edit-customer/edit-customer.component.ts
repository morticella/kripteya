import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import {AppState} from '../../../../reducers/index';
import * as customersAction from '../store/customers.actions';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import { StateService } from '../../../../service/state.service';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit, OnDestroy {

  faVenus = faVenus;
  faMars = faMars;
  idRoom: string;
  idCustomer: string;
  customersState$: any;
  allowedActionControl$: any;

  editCustomer = new FormGroup({
    idCustomer: new FormControl(this.route.snapshot.params['idCustomer'], [Validators.required]),
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
    this.idCustomer = this.route.snapshot.params['idCustomer'];
    this.customersState$ = this.stateService.customersState$;
    this.allowedActionControl$ = this.stateService.allowedActionControl$.subscribe(
      appState => {
        if (appState.customers.ids[0]) {
          this.editCustomer.get('name').setValue(appState.customers.entities[this.idCustomer].name);
          this.editCustomer.get('rent').setValue(appState.customers.entities[this.idCustomer].rent);
          this.editCustomer.get('deposit').setValue(appState.customers.entities[this.idCustomer].deposit);
          if (appState.customers.entities[this.idCustomer].notice) {
            this.editCustomer.get('notice').setValue(new Date(appState.customers.entities[this.idCustomer].notice));
          }
          if (appState.customers.entities[this.idCustomer].booked) {
            this.editCustomer.get('booked').setValue(new Date(appState.customers.entities[this.idCustomer].booked));
          }
        }
      }
    );
    this.stateService.reloadControl();
  }


  onSubmit(editCustomer: FormGroup) {
    this.store.dispatch(new customersAction.EditCustomer(editCustomer.value));
  }

  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }

}

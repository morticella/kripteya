import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../reducers/index';
import * as reportsAction from '../../reports/store/reports.actions';
import * as customersAction from '../store/customers.actions';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import { StateService } from 'src/app/service/state.service';
import { Report } from 'src/app/shared/models/report.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  faVenus = faVenus;
  faMars = faMars;
  nameBuilding: string;
  nameRoom: string;
  namePayment: string;
  idCustomer: string;
  allowedActionControl$: any;
  reportsArray = [];

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
    type: new FormControl( 'checkout', Validators.required),
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
          this.namePayment = appState.customers.entities[this.idCustomer].name;
          const amount = appState.customers.entities[this.idCustomer].rent;
          const deposit = appState.customers.entities[this.idCustomer].deposit;
          const reports = Object.values(appState.reports.entities);

          if (idRoom && idBuilding) {
            this.nameRoom = appState.rooms.entities[idRoom].name;
            this.nameBuilding = appState.buildings.entities[idBuilding].nameBuilding;
          }

          for (const report of reports) {
            this.reportsArray.push(report);
          }

          this.reportsArray = reports.sort((a: Report, b: Report) => {
            return +new Date(b.to) - +new Date(a.to);
          });

          const from = new Date(appState.reports.lastPayment(this.idCustomer, this.reportsArray).to);
              if (idRoom && idBuilding && this.namePayment && amount && deposit) {
                this.newCustomer.get('idRoom').setValue(idRoom);
                this.newCustomer.get('idBuilding').setValue(idBuilding);
                this.newCustomer.get('namePayment').setValue(this.namePayment);
                this.newCustomer.get('amount').setValue(amount);
                this.newCustomer.get('deposit').setValue(deposit);
                this.newCustomer.get('from').setValue(new Date(from));
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





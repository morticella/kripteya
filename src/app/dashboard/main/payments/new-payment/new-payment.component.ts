import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../reducers/index';
import * as reportsAction from '../../reports/store/reports.actions';
// import * as reportsAction from '../store/payments.actions';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import { StateService } from 'src/app/service/state.service';
import { Report } from 'src/app/shared/models/report.model';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit, OnDestroy {

  faVenus = faVenus;
  faMars = faMars;
  nameBuilding: string;
  nameRoom: string;
  namePayment: string;
  idCustomer: string;
  allowedActionControl$: any;
  reportsArray = [];

  newPayment = new FormGroup({
    idPayment: new FormControl(this.route.snapshot.params['idCustomer'], [Validators.required]),
    idRoom: new FormControl(null, [Validators.required]),
    idBuilding: new FormControl(null, [Validators.required]),
    namePayment: new FormControl(null, [Validators.required]),
    now: new FormControl(new Date(), Validators.required),
    from: new FormControl(new Date(), Validators.required),
    to: new FormControl(new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)), Validators.required),
    amount: new FormControl( null, Validators.required),
    deposit: new FormControl( 0),
    info: new FormControl( null),
    type: new FormControl( 'rent', Validators.required),
    paymentType: new FormControl(null, Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private stateService: StateService) { }

  ngOnInit() {
    this.store.dispatch(new reportsAction.LoadingReports());
    this.idCustomer = this.route.snapshot.params['idCustomer'];
    console.log(this.idCustomer);
    this.allowedActionControl$ = this.stateService.allowedActionControl$.subscribe(
      appState => {
        if (appState.rooms.ids[0] && appState.buildings.ids[0] && appState.reports.ids[0]) {
          const idRoom = appState.customers.entities[this.idCustomer].idRoom;
          const idBuilding = appState.customers.entities[this.idCustomer].idBuilding;
          this.namePayment = appState.customers.entities[this.idCustomer].name;
          const amount = appState.customers.entities[this.idCustomer].rent;
          const deposit = appState.customers.entities[this.idCustomer].deposit;
          const reports = Object.values(appState.reports.entities);

          for (const report of reports) {
                this.reportsArray.push(report);
          }

          this.reportsArray = reports.sort((a: Report, b: Report) => {
            return +new Date(b.to) - +new Date(a.to);
          });

          const from = new Date(appState.reports.lastPayment(this.idCustomer, this.reportsArray).to);

          if (idRoom && idBuilding) {
            this.nameRoom = appState.rooms.entities[idRoom].name;
            this.nameBuilding = appState.buildings.entities[idBuilding].nameBuilding;
          }
          if (idRoom && idBuilding && this.namePayment && amount && deposit) {
            this.newPayment.get('idRoom').setValue(idRoom);
            this.newPayment.get('idBuilding').setValue(idBuilding);
            this.newPayment.get('namePayment').setValue(this.namePayment);
            this.newPayment.get('amount').setValue(amount);
            this.newPayment.get('from').setValue(new Date(from));
            this.newPayment.get('to').setValue(new Date(from.setDate(from.getDate() + 7)));
          }

        }
      }
    );

    this.stateService.reloadControl();

  }

  onSubmit(newPayment: FormGroup) {
    this.store.dispatch(new reportsAction.AddReport(newPayment.value));
  }
  ngOnDestroy () {
    this.allowedActionControl$.unsubscribe();
  }

}



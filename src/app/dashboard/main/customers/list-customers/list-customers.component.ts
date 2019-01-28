import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as customersAction from '../store/customers.actions';

import { StateService } from '../../../../service/state.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})

export class ListCustomersComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private stateService: StateService
    ) {}

  idRoom: string;
  customersState$: any;
  allowedActionControl$: any;
  reportsArray = [];

  ngOnInit() {

    this.idRoom = this.route.snapshot.params['idRoom'];
    this.customersState$ = this.stateService.customersState$;
    this.allowedActionControl$ = this.stateService.allowedActionControl$.subscribe(
        appState => {
            if (appState.reports.ids[0] && this.reportsArray.length < appState.reports.ids.length) {
              const reports = Object.values(appState.reports.entities);
              for (const report of reports) {
                this.reportsArray.push(report);
              }

           }
        });

    this.stateService.reloadControl();

  }
  onDelete(id: string) {
    this.store.dispatch(new customersAction.DeleteCustomer(id));
  }

  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}





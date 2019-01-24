import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as reportsAction from '../store/reports.actions';
import { AppState } from 'src/app/reducers';

import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css']
})

export class ListReportsComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private stateService: StateService
    ) {}

  idRoom: string;
  allowedActionControl$: any;
  buildingsState: Object;
  reportsState: Object;

  ngOnInit() {

    this.idRoom = this.route.snapshot.params['idRoom'];

    this.reportsState = this.stateService.reportsState$;
    this.buildingsState = this.stateService.buildingsState$;

    this.allowedActionControl$ = this.stateService.allowedActionControl$.subscribe(
        state => {
          this.stateService.reloadReports = state.reports.ids[0];
          this.stateService.reloadRooms = state.rooms.ids[0];
          this.stateService.reloadBuildings = state.buildings.ids[0];

        });
    this.stateService.reloadControl();
  }

  onDelete(id: string) {
    this.store.dispatch(new reportsAction.DeleteReport(id));
  }

  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}





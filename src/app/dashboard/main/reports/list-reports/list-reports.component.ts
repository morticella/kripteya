import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';

import * as reportsAction from '../store/reports.actions';
import * as roomsAction from '../../rooms/store/rooms.actions';
import * as buildingsAction from '../../buildings/store/building-list.actions';
import { AppState } from 'src/app/reducers';
import { ReportsState } from '../store/reports.reducers';
import { Report } from '../../../../shared/models/report.model';
import { Reports } from '../../../../shared/models/reports.model';
import { Entities } from 'src/app/shared/entities.pipe';



@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css']
})



export class ListReportsComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ) {}

  idRoom: string;
  reportsState$: Observable<AppState>;
  allowedActionControl$: Observable<AppState> | any;
  reportsState: Object;
  reloadRooms: number | string;
  reloadBuildings: number  | string;
  reloadReports: number | string;
  displayedColumns: string[] = ['namePayment', 'amount'];
  // reportsData: Object;
  // reportsD: Report[] = this.reportsData;
  dataSource: any;



  ngOnInit() {
    // if (this.reportsData) {
    //   this.dataSource = this.reportsData;
    // }


    this.idRoom = this.route.snapshot.params['idRoom'];
    this.reportsState$ = this.store.select<AppState>('reports');
    this.reportsState = this.reportsState$;
    this.allowedActionControl$ = this.store.select(state => state).subscribe(
        state => {
          this.reloadReports = state.reports.ids[0];
          this.reloadRooms = state.rooms.ids[0];
          this.reloadBuildings = state.buildings.ids[0];
          // this.reportsData = state.reports.entities;
          const dataSource = [];
          for (let i = 0; i < state.reports.ids.length; i++) {
            dataSource.push(JSON.parse(JSON.stringify(state.reports.entities[state.reports.ids[i]])));
          }
          this.dataSource = dataSource;
          if (this.dataSource[0]) {
            console.log(this.dataSource[0].namePayment);
          }
        });
    if (!this.reloadReports) {
          this.store.dispatch(new reportsAction.LoadingReports());
    }
    if (!this.reloadRooms) {
          this.store.dispatch(new roomsAction.LoadingRooms());
    }
    if (!this.reloadBuildings) {
          this.store.dispatch(new buildingsAction.LoadingBuildings());
    }
  }

  onDelete(id: string) {
    this.store.dispatch(new reportsAction.DeleteReport(id));
  }

  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}





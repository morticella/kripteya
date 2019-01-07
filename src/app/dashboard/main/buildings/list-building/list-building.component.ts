import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';
import { Building } from 'src/app/shared/models/building.model';


// import * as fromBuildings from '../store/building-list.reducer';
import * as fromIndexReducer from '../../../../reducers/index';
import * as fromBuildings from '../store/building-list.reducer';
import * as buildingsAction from '../store/building-list.actions';
import {selectAllBuildings} from '../store/building-list.selectors';
import { HttpClient } from '@angular/common/http';
import { Buildings } from 'src/app/shared/models/buildings.model';



@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css'],
})

export class ListBuildingComponent implements OnInit {

  constructor(
    private storageData: StorageDataService,
    private store: Store<fromBuildings.BuildingsState>,
    private http: HttpClient
              ) {}

  buildings$: Observable<any>;
  ids$: Observable<any>;
  buildings: {};





  ngOnInit() {


    this.buildings$ = this.store.select<any>('buildings');
    this.ids$ = this.store.select<any>('ids');
    // this.store.select<fromBuildings.BuildingsState>
    // this.buildings$ = this.store.select<fromBuildings.AppState[]>('statusList');
    this.buildings = this.buildings$;


    const buildings = {};
    // this.buildings = Object.values(this.buildings);
    // const payloadOk = this.http.get(data => data);
    this.store.dispatch(new buildingsAction.LoadingBuildings());
    console.log('buildings', this.buildings[0]);
  }
  onDelete(id: string) {
    this.storageData.deleteBuilding(id);
  }


}

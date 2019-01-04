import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';
import { Building } from 'src/app/shared/models/building.model';

// import * as fromBuildings from '../store/building-list.reducer';
import * as fromBuildings from '../../../../reducers/index';
import * as buildingsAction from '../store/building-list.actions';

@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css']
})
export class ListBuildingComponent implements OnInit, OnDestroy {

  constructor(
    private storageData: StorageDataService,
    private store: Store<fromBuildings.AppState>
              ) {}

  buildings$: Observable<fromBuildings.AppState[]>;
  buildings: any;


  ngOnInit() {
    this.buildings$ = this.store.select<fromBuildings.AppState[]>('buildings');
    // this.buildings$ = this.store.select<fromBuildings.AppState[]>('statusList');
    this.buildings = this.buildings$;
    // console.log('buildings', this.buildings$, this.buildings);
    this.store.dispatch(new buildingsAction.LoadingBuildings());
  }
  onDelete(id: string) {
    this.storageData.deleteBuilding(id);
  }

  ngOnDestroy() {
    // this.buildingsUpadate.unsubscribe();
  }
}

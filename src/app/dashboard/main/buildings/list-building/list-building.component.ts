import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
// import {switchMap, map, take} from 'rxjs/operators';

import * as fromBuildings from '../store/building-list.reducer';
import * as buildingsAction from '../store/building-list.actions';
import { AppState } from 'src/app/reducers';
// import { pipe } from '@angular/core/src/render3';
// import {selectAllBuildings} from '../store/building-list.selectors';

@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css'],
})

export class ListBuildingComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  buildingsState$: Observable<fromBuildings.BuildingsState>;
  buildings: any;
  // buildingLength: any;
  // checkBuildingsLength: any;
  // saveBuildingsLength = 0;
  check: number;
  checkRefresh: string | number ;
  stopRefresh = 0;

  ngOnInit() {
    this.buildingsState$ = this.store.select<fromBuildings.BuildingsState>('buildings');
    this.store.select(buildingsState => buildingsState).subscribe(
        buildingsState => {
         this.check = buildingsState.buildings.ids.length;
          if (this.check === 0 && this.stopRefresh === 0) {
            this.stopRefresh = 1;
            this.store.dispatch(new buildingsAction.LoadingBuildings());
           }
        });
  }
  onDelete(id: string) {
    this.store.dispatch(new buildingsAction.DeleteBuilding(id));
  }
}

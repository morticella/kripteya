import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import {switchMap, map, take} from 'rxjs/operators';

import * as fromBuildings from '../store/building-list.reducer';
import * as buildingsAction from '../store/building-list.actions';
import { AppState } from 'src/app/reducers';
import { pipe } from '@angular/core/src/render3';
// import {selectAllBuildings} from '../store/building-list.selectors';

@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css'],
})

export class ListBuildingComponent implements OnInit {

  constructor(private store: Store<fromBuildings.BuildingsState>,
              private storeControl: Store<AppState>) {}

  buildingsState$: Observable<fromBuildings.BuildingsState>;
  buildings: any;
  buildingLength: any;
  checkBuildingsLength: any;
  saveBuildingsLength = 0;

  ngOnInit() {
    // this.saveBuildingsLength++;


    this.buildingsState$ = this.store.select<fromBuildings.BuildingsState>('buildings');
    this.buildings = this.buildingsState$;
    this.storeControl.dispatch(new buildingsAction.LoadingBuildings());
    this.storeControl.select(buildingsState => buildingsState.buildings).subscribe(

        // this.checkBuildingsLength =


        // buildingsState => {
        //
        //   console.log(buildingsState);
        // }
    );

  }
  onDelete(id: string) {
    this.store.dispatch(new buildingsAction.DeleteBuilding(id));
  }
}

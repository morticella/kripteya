import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';

import * as fromBuildings from '../store/building-list.reducer';
import * as buildingsAction from '../store/building-list.actions';
// import {selectAllBuildings} from '../store/building-list.selectors';

@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css'],
})

export class ListBuildingComponent implements OnInit {

  constructor(private store: Store<fromBuildings.BuildingsState>) {}

  buildingsState$: Observable<fromBuildings.BuildingsState>;
  buildings: any;

  ngOnInit() {
    this.store.dispatch(new buildingsAction.LoadingBuildings());
    this.buildingsState$ = this.store.select<fromBuildings.BuildingsState>('buildings');
    this.buildings = this.buildingsState$;
  }
  onDelete(id: string) {
    this.store.dispatch(new buildingsAction.DeleteBuilding(id));
  }
}

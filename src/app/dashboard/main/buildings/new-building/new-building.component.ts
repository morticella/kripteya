import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {  Observable } from 'rxjs';
import * as fromBuildings from '../../../../reducers/index';
import * as buildingsAction from '../store/building-list.actions';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-building',
  templateUrl: './new-building.component.html',
  styleUrls: ['./new-building.component.css']
})
export class NewBuildingComponent implements OnInit {


  newBuilding = new FormGroup({
    nameBuilding: new FormControl(null, [Validators.required]),
    address: new FormControl(null, Validators.required),
    info: new FormControl( null),
  });

  constructor(
    private store: Store<fromBuildings.AppState>,
    ) { }

    errors$: Observable<fromBuildings.AppState[]>;
    errors: any;

  ngOnInit() {

    this.errors$ = this.store.select<fromBuildings.AppState[]>('buildings');
    this.errors = this.errors$;
  }

  onSubmit(newBuilding: FormGroup) {
    this.errors = this.errors$;
    this.store.select<fromBuildings.AppState[]>('buildings');
    this.store.dispatch(new buildingsAction.AddBuilding(newBuilding.value));
  }
}

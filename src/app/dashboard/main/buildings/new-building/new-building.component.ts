import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromBuildings from '../../../../reducers/index';
import * as buildingsAction from '../store/building-list.actions';
import { StateService } from '../../../../service/state.service';

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
    private stateService: StateService
    ) { }

    buildingsState$: any;

  ngOnInit() {
    this.buildingsState$ = this.stateService.buildingsState$;
  }

  onSubmit(newBuilding: FormGroup) {
    this.store.dispatch(new buildingsAction.AddBuilding(newBuilding.value));
  }
}

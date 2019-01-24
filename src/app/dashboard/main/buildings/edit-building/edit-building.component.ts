import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import * as buildingsAction from '../store/building-list.actions';
import { StateService } from '../../../../service/state.service';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css']
})
export class EditBuildingComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private stateService: StateService) { }

  editBuilding = new FormGroup({
       nameBuilding: new FormControl(null, Validators.required),
       address: new FormControl(null, Validators.required),
       id: new FormControl( this.route.snapshot.params['id']),
       info: new FormControl( null, Validators.required ),
  });

  buildingsState$: any;
  idBuilding: string;
  allowedActionControl$: any;

  ngOnInit() {
      this.idBuilding = this.route.snapshot.params['id'];

      this.buildingsState$ = this.stateService.buildingsState$;
      this.allowedActionControl$ = this.stateService.allowedActionControl$.subscribe(
        appState => {
          if (this.idBuilding && appState.buildings.ids[0]) {
            const nameBuilding = appState.buildings.entities[this.idBuilding].nameBuilding;
            const address = appState.buildings.entities[this.idBuilding].address;
            const info = appState.buildings.entities[this.idBuilding].info;
            if (nameBuilding && address && info) {
              this.editBuilding.get('nameBuilding').setValue(nameBuilding);
              this.editBuilding.get('address').setValue(address);
              this.editBuilding.get('info').setValue(info);
            }
          }

        }
      );
      this.stateService.reloadControl();
  }

  onSubmit(editBuilding: FormGroup) {
     this.store.dispatch(new buildingsAction.EditBuilding(editBuilding));
  }

  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}

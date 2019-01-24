import { Component, OnInit } from '@angular/core';
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
export class EditBuildingComponent implements OnInit {

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
  nameBuilding: string;
  address: string;
  info: string;

  ngOnInit() {
      this.idBuilding = this.route.snapshot.params['id'];

      this.buildingsState$ = this.stateService.buildingsState$;
      this.stateService.allowedActionControl$.subscribe(
        appState => {
          if (this.idBuilding && appState.buildings.ids[0]) {
            this.nameBuilding = appState.buildings.entities[this.idBuilding].nameBuilding;
            this.address = appState.buildings.entities[this.idBuilding].address;
            this.info = appState.buildings.entities[this.idBuilding].info;
            console.log(this.nameBuilding);

          }
          if (this.nameBuilding && this.address && this.info) { console.log(this.nameBuilding);
            this.editBuilding.get('nameBuilding').setValue(this.nameBuilding);
            this.editBuilding.get('address').setValue(this.address);
            this.editBuilding.get('info').setValue(this.info);
          }
        }
      );
      this.stateService.reloadControl();
      // console.log(this.nameBuilding);
      // this.editBuilding.get('nameBuilding').setValue(this.nameBuilding);

  }

  onSubmit(editBuilding: FormGroup) {
     this.store.dispatch(new buildingsAction.EditBuilding(editBuilding));
  }

  // ngOnDestroy() {
  //   this.allowedActionControl$.unsubscribe();
  // }
}

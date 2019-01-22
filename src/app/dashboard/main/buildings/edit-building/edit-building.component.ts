import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as buildingsAction from '../store/building-list.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css']
})
export class EditBuildingComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) { }
  building: Object;
  errorClass: boolean;
  nameInvalid: string;
  buildingsState$: Observable<AppState>;
  editBuilding = new FormGroup({
    nameBuilding: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    id: new FormControl( this.route.snapshot.params['id']),
    info: new FormControl( null, Validators.required ),
  });

  idBuilding: string;
  nameBuilding: string;
  address: string;
  info: string;
  reloadBuildings: Object;
  emergencyReload$: any;

  ngOnInit() {
    if (!this.reloadBuildings) {
      this.store.dispatch(new buildingsAction.LoadingBuildings());
    }
      this.idBuilding = this.route.snapshot.params['id'];
      this.buildingsState$ = this.store.select<AppState>('buildings');
      this.building = this.buildingsState$;

      this.emergencyReload$ = this.store.select(appState => appState).subscribe(
        appState => {
          this.reloadBuildings = appState.buildings.ids[0];
        }
      );


  }

  onSubmit(editBuilding: FormGroup) {
    this.store.dispatch(new buildingsAction.EditBuilding(editBuilding));
  }

  ngOnDestroy() {
    this.emergencyReload$.unsubscribe();
  }
}

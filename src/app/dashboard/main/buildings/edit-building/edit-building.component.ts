import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBuildings from '../store/building-list.reducer';
import * as buildingsAction from '../store/building-list.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css']
})
export class EditBuildingComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private store: Store<fromBuildings.BuildingsState>,
              private emergencyStore: Store<AppState>) { }
  @Input() building: any;
  errorClass: boolean;
  nameInvalid: string;
  buildingsState$: Observable<fromBuildings.BuildingsState>;
  editBuilding = new FormGroup({
    nameBuilding: new FormControl(null),
    address: new FormControl(null),
    id: new FormControl( this.route.snapshot.params['id']),
    info: new FormControl( null ),
  });

  buildings: any;
  idBuilding: any;
  nameBuilding: string;
  address: string;
  info: string;
  reloadBuildings: Object;

  ngOnInit() {
      this.idBuilding = this.route.snapshot.params['id'];
      this.buildingsState$ = this.store.select<fromBuildings.BuildingsState>('buildings');
      this.building = this.buildingsState$;

      this.emergencyStore.select(appState => appState).subscribe(
        appState => {
          this.reloadBuildings = appState.buildings.ids[0];
        }
      );
      if (!this.reloadBuildings) {
        this.emergencyStore.dispatch(new buildingsAction.LoadingBuildings());
      }

  }

  onSubmit(editBuilding: FormGroup) {
    this.store.dispatch(new buildingsAction.EditBuilding(editBuilding));
  }
}

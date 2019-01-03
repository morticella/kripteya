import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, skip} from 'rxjs/operators';


import * as BuildingsListActions from '../store/building-list.actions';
import {Building} from '../../../../shared/models/building.model';
// import { BuildingsListReducers } from './building-list.reducer';
import { Store } from '@ngrx/store';
import * as fromBuildings from '../store/building-list.reducer';
import { state } from '@angular/animations';
import { Action } from 'rxjs/internal/scheduler/Action';




// export interface LoadBuilding {
//      buildings: Building[];
//   }

@Injectable()
export class BuildingEffects {
  urlBackEnd = 'http://localhost:3000';
  newBuilding: Building;
  @Effect()
 loadBuildings$ = this.actions$
 .pipe(ofType(BuildingsListActions.LOADING_BUILDINGS), switchMap( () => {
  return this.http.get<Building[]>(this.urlBackEnd + '/api/buildings').pipe(
    map(
      data => new BuildingsListActions.SuccessBuilding(data)
    ));
  }));
  @Effect()
 AddBuilding$ = this.actions$
 .pipe(ofType(BuildingsListActions.ADD_BUILDING), switchMap( (action: BuildingsListActions.AddBuilding) => {
   this.newBuilding = action.payload;
  return this.http.post<Building>(this.urlBackEnd + '/api/new-building', this.newBuilding).pipe(
    map(
      () => new BuildingsListActions.AddedBuilding()
    ), skip(1));
  }));
 constructor(
   private actions$: Actions,
   private http: HttpClient) {}

}


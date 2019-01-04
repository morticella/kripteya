import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, skip, catchError, tap} from 'rxjs/operators';


import * as BuildingsListActions from '../store/building-list.actions';
import {Building} from '../../../../shared/models/building.model';
// import { BuildingsListReducers } from './building-list.reducer';
import { Store } from '@ngrx/store';
// import * as fromBuildings from '../store/building-list.reducer';

// import { Action } from 'rxjs/internal/scheduler/Action';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class BuildingEffects {
  urlBackEnd = 'http://localhost:3000';
  newBuilding: Building;
  error = 0;
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
   this.newBuilding = action.payload, this.error = 0;
  return this.http.post<Building>(this.urlBackEnd + '/api/new-building', this.newBuilding).pipe(
    map(
       () => new BuildingsListActions.AddBuildingSuccess(this.newBuilding),
    ),
    tap(
      () => this.router.navigate(['dashboard/buildings'])
    ),
    catchError(
      () =>  of(new BuildingsListActions.AddBuildingFailed(true))
    ));
  }));
 constructor(
   private actions$: Actions,
   private http: HttpClient,
   // private store: Store < fromBuildings.AppState > ,
   private router: Router) {}

}


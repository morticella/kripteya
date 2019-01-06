import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, skip, catchError, tap} from 'rxjs/operators';

import { BuildingsActionTypes,
         AddBuilding,
         AddBuildingFailed,
         AddBuildingSuccess,
         LoadingBuildings,
         LoadingBuildingsFailed,
         LoadingBuildingsSuccess,
      } from '../store/building-list.actions';
// import * as BuildingsListActions from '../store/building-list.actions';
import {Building} from '../../../../shared/models/building.model';

import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class BuildingEffects {
  urlBackEnd = 'http://localhost:3000';
  newBuilding: Building;
  error = 0;
  @Effect()
 loadBuildings$ = this.actions$
 .pipe(ofType<LoadingBuildings>(BuildingsActionTypes.LoadingBuildings), switchMap( () => {
  return this.http.get<Building[]>(this.urlBackEnd + '/api/buildings').pipe(
    map(
      data => new LoadingBuildingsSuccess(data)
    ),
    catchError(
      () => of(new LoadingBuildingsFailed(true))
    ));
  }));
  @Effect()
 AddBuilding$ = this.actions$
 .pipe(ofType<AddBuilding>(BuildingsActionTypes.AddBuilding), switchMap(
   (action: AddBuilding) => {
   this.newBuilding = action.payload, this.error = 0;
    return this.http.post<Building>(this.urlBackEnd + '/api/new-building', this.newBuilding)
    .pipe(
    map(
       () => new AddBuildingSuccess(this.newBuilding),
    ),
    tap(
      () => this.router.navigate(['dashboard/buildings'])
    ),
    catchError(
      () =>  of(new AddBuildingFailed(true))
    ));
  }));
 constructor(
   private actions$: Actions,
   private http: HttpClient,
   // private store: Store < fromBuildings.AppState > ,
   private router: Router) {}

}


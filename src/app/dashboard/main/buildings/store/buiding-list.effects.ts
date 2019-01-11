import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, skip, catchError, tap, mergeMap, mapTo} from 'rxjs/operators';
import { of } from 'rxjs';

import { BuildingsActionTypes } from '../store/building-list.actions';
import * as BuildingsActions from '../store/building-list.actions';
import { Building } from '../../../../shared/models/building.model';

@Injectable()
export class BuildingEffects {
  urlBackEnd = 'http://localhost:3000';
  newBuilding: Building;
  error = 0;
  id: string;
  @Effect()
 loadBuildings$ = this.actions$
 .pipe(ofType<BuildingsActions.LoadingBuildings>(BuildingsActionTypes.LoadingBuildings), mergeMap( () => {
  return this.http.get<any>(this.urlBackEnd + '/api/buildings').pipe(
    map(
      data => new BuildingsActions.LoadingBuildingsSuccess(data)
    ),
    catchError(
      () => of(new BuildingsActions.LoadingBuildingsFailed(true))
    ));
  }));
  @Effect()
 AddBuilding$ = this.actions$
 .pipe(ofType<BuildingsActions.AddBuilding>(BuildingsActionTypes.AddBuilding),
 switchMap(
   (action: BuildingsActions.AddBuilding) => {
   this.newBuilding = action.payload;
   this.error = 0;
    return this.http.post<Building>(this.urlBackEnd + '/api/new-building', this.newBuilding)
    .pipe(
    map(
       () => new BuildingsActions.AddBuildingSuccess(this.newBuilding),
    ),
    tap(
      () => this.router.navigate(['dashboard/buildings'])
    ),
    catchError(
      () =>  of(new BuildingsActions.AddBuildingFailed(true))
    ));
  }));
  @Effect()
  DeleteBuilding$ = this.actions$
  .pipe(ofType<BuildingsActions.DeleteBuilding>(BuildingsActionTypes.DeleteBuilding),
  switchMap(
    (action: BuildingsActions.DeleteBuilding) => {
    this.id = action.payload; this.error = 0;
     return this.http.delete<Building>(this.urlBackEnd + '/api/new-building/' + this.id)
     .pipe(
     map(
        () => new BuildingsActions.DeleteBuildingSuccess(this.id),
     ),
     catchError(
       () =>  of(new BuildingsActions.DeleteBuildingFailed(true))
     ));
   }));
  @Effect()
  EditBuilding$ = this.actions$
  .pipe(ofType<BuildingsActions.EditBuilding>(BuildingsActionTypes.EditBuilding), tap( ),
  mergeMap(
    (action: BuildingsActions.EditBuilding) => {
    const id = action.payload.id;
    this.newBuilding = action.payload;
     return this.http.put<Building>(this.urlBackEnd + '/api/new-building/' + id, this.newBuilding)
     .pipe(
     map(
      () => new BuildingsActions.EditBuildingSuccess(this.newBuilding),
     ),
     tap(
      () => this.router.navigate(['dashboard/buildings'])
    ),
     catchError(
       () =>  of(new BuildingsActions.EditBuildingFailed(true))
     ));
   }));

 constructor(
   private actions$: Actions,
   private http: HttpClient,
   private router: Router) {}
}


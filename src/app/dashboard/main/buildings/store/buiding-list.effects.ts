import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, skip, catchError, tap, mergeMap} from 'rxjs/operators';
import { of } from 'rxjs';

import { BuildingsActionTypes } from '../store/building-list.actions';
import * as BuildingsActions from '../store/building-list.actions';
import * as fromBuildings from '../store/building-list.reducer';
import { Building } from '../../../../shared/models/building.model';
import { StateBuildings } from 'src/app/shared/models/stateBuildings.model';
import { Buildings } from 'src/app/shared/models/buildings.model';



@Injectable()
export class BuildingEffects {
  urlBackEnd = 'http://localhost:3000';
  newBuilding: Building;
  error = 0;
  @Effect()
 loadBuildings$ = this.actions$
 .pipe(ofType<BuildingsActions.LoadingBuildings>(BuildingsActionTypes.LoadingBuildings), switchMap( () => {
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
   this.newBuilding = action.payload, this.error = 0;
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

  // @Effect()
  // loadAllCourses$ = this.actions$
  //   .pipe(
  //     ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
  //     withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
  //     filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
  //     mergeMap(() => this.coursesService.findAllCourses()),
  //     map(courses => new AllCoursesLoaded({courses}))
  //   );


 constructor(
   private actions$: Actions,
   private http: HttpClient,
   private store: Store<fromBuildings.BuildingsState>,
   private router: Router) {}

}


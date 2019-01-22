import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, concatMap, catchError, tap, mergeMap, mapTo} from 'rxjs/operators';
import { of } from 'rxjs';

import { ReportsActionTypes } from '../store/reports.actions';
import * as ReportsActions from '../store/reports.actions';
import { Report } from '../../../../shared/models/report.model';

@Injectable()
export class ReportEffects {
  urlBackEnd = 'http://localhost:3000';
  newReport: Report;
  error = 0;
  id: string;
  @Effect()
 loadReports$ = this.actions$
 .pipe(ofType<ReportsActions.LoadingReports>(ReportsActionTypes.LoadingReports), mergeMap( () => {
  return this.http.get<any>(this.urlBackEnd + '/api/reports').pipe(
    map(
      data => new ReportsActions.LoadingReportsSuccess(data)
    ),
    catchError(
      () => of(new ReportsActions.LoadingReportsFailed(true))
    ));
  }));
  @Effect()
 AddReport$ = this.actions$
 .pipe(ofType<ReportsActions.AddReport>(ReportsActionTypes.AddReport),
 switchMap(
   (action: ReportsActions.AddReport) => {
   this.newReport = action.payload;
   console.log('here I');
   this.error = 0;
    return this.http.post<Report>(this.urlBackEnd + '/api/new-report', this.newReport)
    .pipe(
      concatMap(currentUserAccount => [
        new ReportsActions.AddReportSuccess(this.newReport),
        new ReportsActions.LoadingReports()
      ]),
    tap(
      () => this.router.navigate(['dashboard/buildings'])
    ),
    catchError(
      () =>  of(new ReportsActions.AddReportFailed(true))
    ));
  }));
  @Effect()
  DeleteReport$ = this.actions$
  .pipe(ofType<ReportsActions.DeleteReport>(ReportsActionTypes.DeleteReport),
  switchMap(
    (action: ReportsActions.DeleteReport) => {
    this.id = action.payload; this.error = 0;
     return this.http.delete<Report>(this.urlBackEnd + '/api/new-report/' + this.id)
     .pipe(
     map(
        () => new ReportsActions.DeleteReportSuccess(this.id),
     ),
     catchError(
       () =>  of(new ReportsActions.DeleteReportFailed(true))
     ));
   }));
  @Effect()
  EditReport$ = this.actions$
  .pipe(ofType<ReportsActions.EditReport>(ReportsActionTypes.EditReport), tap( ),
  mergeMap(
    (action: ReportsActions.EditReport) => {
    const id = action.payload.idReport;
    this.newReport = action.payload;
     return this.http.put<Report>(this.urlBackEnd + '/api/new-report/' + id, this.newReport)
     .pipe(
     map(
      () => new ReportsActions.EditReportSuccess(this.newReport),
     ),
     tap(
      () => this.router.navigate(['dashboard/buildings'])
    ),
     catchError(
       () =>  of(new ReportsActions.EditReportFailed(true))
     ));
   }));
 constructor(
   private actions$: Actions,
   private http: HttpClient,
   private router: Router) {}

}

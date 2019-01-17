import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, concatMap, catchError, tap, mergeMap, mapTo} from 'rxjs/operators';
import { of } from 'rxjs';

import { CustomersActionTypes } from '../store/customers.actions';
import * as CustomersActions from '../store/customers.actions';
import { Customer } from '../../../../shared/models/customer.model';

@Injectable()
export class CustomerEffects {
  urlBackEnd = 'http://localhost:3000';
  newCustomer: Customer;
  error = 0;
  id: string;
  @Effect()
 loadCustomers$ = this.actions$
 .pipe(ofType<CustomersActions.LoadingCustomers>(CustomersActionTypes.LoadingCustomers), mergeMap( () => {
  return this.http.get<any>(this.urlBackEnd + '/api/customers').pipe(
    map(
      data => new CustomersActions.LoadingCustomersSuccess(data)
    ),
    catchError(
      () => of(new CustomersActions.LoadingCustomersFailed(true))
    ));
  }));
  @Effect()
 AddCustomer$ = this.actions$
 .pipe(ofType<CustomersActions.AddCustomer>(CustomersActionTypes.AddCustomer),
 switchMap(
   (action: CustomersActions.AddCustomer) => {
   this.newCustomer = action.payload;
   console.log('here I');
   this.error = 0;
    return this.http.post<Customer>(this.urlBackEnd + '/api/new-customer', this.newCustomer)
    .pipe(
      concatMap(currentUserAccount => [
        new CustomersActions.AddCustomerSuccess(this.newCustomer),
        new CustomersActions.LoadingCustomers()
      ]),
    tap(
      () => this.router.navigate(['dashboard/buildings'])
    ),
    catchError(
      () =>  of(new CustomersActions.AddCustomerFailed(true))
    ));
  }));
  @Effect()
  DeleteCustomer$ = this.actions$
  .pipe(ofType<CustomersActions.DeleteCustomer>(CustomersActionTypes.DeleteCustomer),
  switchMap(
    (action: CustomersActions.DeleteCustomer) => {
    this.id = action.payload; this.error = 0;
     return this.http.delete<Customer>(this.urlBackEnd + '/api/new-customer/' + this.id)
     .pipe(
     map(
        () => new CustomersActions.DeleteCustomerSuccess(this.id),
     ),
     catchError(
       () =>  of(new CustomersActions.DeleteCustomerFailed(true))
     ));
   }));
  @Effect()
  EditCustomer$ = this.actions$
  .pipe(ofType<CustomersActions.EditCustomer>(CustomersActionTypes.EditCustomer), tap( ),
  mergeMap(
    (action: CustomersActions.EditCustomer) => {
    const id = action.payload.idCustomer;
    this.newCustomer = action.payload;
     return this.http.put<Customer>(this.urlBackEnd + '/api/new-customer/' + id, this.newCustomer)
     .pipe(
     map(
      () => new CustomersActions.EditCustomerSuccess(this.newCustomer),
     ),
     tap(
      () => this.router.navigate(['dashboard/buildings'])
    ),
     catchError(
       () =>  of(new CustomersActions.EditCustomerFailed(true))
     ));
   }));
 constructor(
   private actions$: Actions,
   private http: HttpClient,
   private router: Router) {}

}

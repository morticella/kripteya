import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';

import * as fromCustomers from '../store/customers.reducers';
import * as customersAction from '../store/customers.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

  idRoom: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ) {}

  customersState$: Observable<fromCustomers.CustomersState>;
  customers: any;
  check: number;
  checkRefresh: string | number ;
  stopRefresh = 0;


  ngOnInit() {

    this.idRoom = this.route.snapshot.params['idRoom'];

    this.customersState$ = this.store.select<fromCustomers.CustomersState>('customers');
    // this.customers = this.customersState$;
    this.store.select(customersState => customersState).subscribe(
        customersState => {
         this.check = customersState.customers.ids.length;
          if (this.check === 0 && this.stopRefresh === 0) {
            this.stopRefresh = 1;
            this.store.dispatch(new customersAction.LoadingCustomers());
           }
        });
  }



  onDelete(id: string) {
    this.store.dispatch(new customersAction.DeleteCustomer(id));
  }
}





import {Action} from '@ngrx/store';

import {Customer} from '../../../../shared/models/customer.model';

export enum CustomersActionTypes {
  AddCustomer = '[Add New Customer] Customer Request',
  AddCustomerSuccess = '[Customers API] Add New Customer Success',
  AddCustomerFailed = '[Customers API] Add New Customer Failed',
  LoadingCustomers = '[Load All Customers] Customers Request',
  LoadingCustomersSuccess = '[Customers API] Loading Customers Success',
  LoadingCustomersFailed = '[Customers API] Loading Customers Failed',
  DeleteCustomer = '[Delete Customer] Customer Request',
  DeleteCustomerSuccess = '[Customers API] Delete Customer Success',
  DeleteCustomerFailed = '[Customers API] Delete Customer Failed',
  EditCustomer = '[Edit Customer] Customer Request',
  EditCustomerSuccess = '[Customers API] Edit Customer Success',
  EditCustomerFailed = '[Customers API] Edit Customer Failed',
}


export class LoadingCustomers implements Action {
  readonly type = CustomersActionTypes.LoadingCustomers;
}

export class LoadingCustomersSuccess implements Action {
  readonly type = CustomersActionTypes.LoadingCustomersSuccess;
  constructor(public payload: { Customers: Customer[]}) {}
}
export class LoadingCustomersFailed implements Action {
  readonly type = CustomersActionTypes.LoadingCustomersFailed;
  constructor(public error: boolean) {}
}

export class AddCustomer implements Action {
  readonly type = CustomersActionTypes.AddCustomer;
  constructor(public payload: Customer) {}

}
export class AddCustomerFailed implements Action {

  readonly type = CustomersActionTypes.AddCustomerFailed;
  constructor(public error: boolean) {}

}
export class AddCustomerSuccess implements Action {
  readonly type = CustomersActionTypes.AddCustomerSuccess;
  constructor(public payload: Customer) {}

}

export class DeleteCustomer implements Action {
  readonly type = CustomersActionTypes.DeleteCustomer;
  constructor(public payload:  string ) {}
}

export class DeleteCustomerSuccess implements Action {
  readonly type = CustomersActionTypes.DeleteCustomerSuccess;
  constructor(public payload:  string ) {}
}
export class DeleteCustomerFailed implements Action {
  readonly type = CustomersActionTypes.DeleteCustomerFailed;
  constructor(public error: boolean) {}
}

export class EditCustomer implements Action {
  readonly type = CustomersActionTypes.EditCustomer;
  constructor(public payload:  any ) {}
}

export class EditCustomerSuccess implements Action {
  readonly type = CustomersActionTypes.EditCustomerSuccess;
  constructor(public payload:  any ) {}
}
export class EditCustomerFailed implements Action {
  readonly type = CustomersActionTypes.EditCustomerFailed;
  constructor(public error: boolean) {}
}

export type CustomersListAction =
              LoadingCustomers |
              LoadingCustomersSuccess |
              LoadingCustomersFailed |
              AddCustomer |
              AddCustomerSuccess |
              AddCustomerFailed |
              DeleteCustomer |
              DeleteCustomerSuccess |
              DeleteCustomerFailed |
              EditCustomer |
              EditCustomerSuccess |
              EditCustomerFailed;

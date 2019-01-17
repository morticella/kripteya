import {CustomersActionTypes} from './customers.actions';
import {Customers} from '../../../../shared/models/customers.model';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface CustomersState extends EntityState<Customers> {
  entities: {};
  Customer: any;
  editCustomer: any;
  id: string;
  loading: boolean;
  error: boolean;
}

export const adapter: EntityAdapter<Customers> =
  createEntityAdapter<Customers>({selectId: customers => customers._id});


export const initialState: CustomersState = adapter.getInitialState({
  entities: {},
  editCustomer: null,
  id: null,
  Customer: null,
  loading: false,
  error: false
});

export function CustomersReducers(state: CustomersState = initialState, action): CustomersState {
  switch (action.type) {
    case CustomersActionTypes.LoadingCustomers: {
      const loading = true;
      const error = false;
      return  {
      ...state,
      loading,
      error,
    };
    }
    case CustomersActionTypes.LoadingCustomersFailed: {
      const loading = false;
      const error = action.error;
      return {
      ...state,
      loading,
      error
    };
  }
    case CustomersActionTypes.LoadingCustomersSuccess: {
      const loading = false;
      const error = false;
      return adapter.addAll(action.payload,
        {
        ...state,
        loading,
        error,
        });
    }

    case CustomersActionTypes.AddCustomer: {
      const loading = true;
      const error = false;
      return  {
      ...state,
      loading,
      error
    };
  }
  case CustomersActionTypes.AddCustomerFailed: {
    const error = action.error;
    const loading = false;
    return {
    ...state,
    loading,
    error
  };
}
  case CustomersActionTypes.AddCustomerSuccess: {
    const loading = false;
    const error = false;
    const customer = action.payload;
    return adapter.addOne(action.payload, {
    ...state,
    customer,
    loading,
    error,
  });
}

case CustomersActionTypes.DeleteCustomer: {
  const loading = true;
  const error = false;
  return  {
  ...state,
  loading,
  error
  };
}
case CustomersActionTypes.DeleteCustomerFailed: {
  const error = action.error;
  const loading = false;
  return {
  ...state,
  loading,
  error
  };
}

case CustomersActionTypes.DeleteCustomerSuccess: {
  const loading = false;
  const error = false;
  const id = action.payload;
  return adapter.removeOne(action.payload, {
  ...state,
  id,
  loading,
  error,
});
}

case CustomersActionTypes.EditCustomer: {
  const loading = true;
  const error = false;
  const id = action.payload.id;
  const editCustomer = state.entities[action.payload.id];
  return  {
  ...state,
  editCustomer,
  id,
  loading,
  error
  };
}
case CustomersActionTypes.EditCustomerFailed: {
  const error = action.error;
  const loading = false;
  return {
  ...state,
  loading,
  error
  };
}

case CustomersActionTypes.EditCustomerSuccess: {
  const loading = false;
  const error = false;
  const id = action.payload.idCustomer;

  return adapter.updateOne(action.payload, {
  ...state,
  ...state.entities[id].name = action.payload.name,
  ...state.entities[id].rent = action.payload.rent,
  ...state.entities[id].deposit = action.payload.deposit,
  ...state.entities[id].booked = action.payload.booked,
  ...state.entities[id].notice = action.payload.notice,
  id,
  loading,
  error,
  });
}
    default: return state;
}
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

import {ReportsActionTypes} from './reports.actions';
import {Reports} from '../../../../shared/models/reports.model';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface ReportsState extends EntityState<Reports> {
  entities: {};
  report: any;
  editReport: any;
  id: string;
  loading: boolean;
  error: boolean;
}

export const adapter: EntityAdapter<Reports> =
  createEntityAdapter<Reports>({selectId: reports => reports._id});


export const initialState: ReportsState = adapter.getInitialState({
  entities: {},
  editReport: null,
  id: null,
  report: null,
  loading: false,
  error: false
});

export function ReportsReducers(state: ReportsState = initialState, action): ReportsState {
  switch (action.type) {
    case ReportsActionTypes.LoadingReports: {
      const loading = true;
      const error = false;
      return  {
      ...state,
      loading,
      error,
    };
    }
    case ReportsActionTypes.LoadingReportsFailed: {
      const loading = false;
      const error = action.error;
      return {
      ...state,
      loading,
      error
    };
  }
    case ReportsActionTypes.LoadingReportsSuccess: {
      const loading = false;
      const error = false;
      return adapter.addAll(action.payload,
        {
        ...state,
        loading,
        error,
        });
    }

    case ReportsActionTypes.AddReport: {
      const loading = true;
      const error = false;
      return  {
      ...state,
      loading,
      error
    };
  }
  case ReportsActionTypes.AddReportFailed: {
    const error = action.error;
    const loading = false;
    return {
    ...state,
    loading,
    error
  };
}
  case ReportsActionTypes.AddReportSuccess: {

    const error = false;
    const loading = state.loading = false;

    return adapter.addOne(action.payload, {
    ...state,
    loading,
    error,
  });
}

case ReportsActionTypes.DeleteReport: {
  const loading = true;
  const error = false;
  return  {
  ...state,
  loading,
  error
  };
}
case ReportsActionTypes.DeleteReportFailed: {
  const error = action.error;
  const loading = false;
  return {
  ...state,
  loading,
  error
  };
}

case ReportsActionTypes.DeleteReportSuccess: {
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

case ReportsActionTypes.EditReport: {
  const loading = true;
  const error = false;
  const id = action.payload.id;
  const editReport = state.entities[action.payload.id];
  return  {
  ...state,
  editReport,
  id,
  loading,
  error
  };
}
case ReportsActionTypes.EditReportFailed: {
  const error = action.error;
  const loading = false;
  return {
  ...state,
  loading,
  error
  };
}

case ReportsActionTypes.EditReportSuccess: {
  const loading = false;
  const error = false;
  const id = action.payload.idReport;

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

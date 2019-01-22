import {Action} from '@ngrx/store';

import {Report} from '../../../../shared/models/report.model';

export enum ReportsActionTypes {
  AddReport = '[Add New Report] Report Request',
  AddReportSuccess = '[Reports API] Add New Report Success',
  AddReportFailed = '[Reports API] Add New Report Failed',
  LoadingReports = '[Load All Reports] Reports Request',
  LoadingReportsSuccess = '[Reports API] Loading Reports Success',
  LoadingReportsFailed = '[Reports API] Loading Reports Failed',
  DeleteReport = '[Delete Report] Report Request',
  DeleteReportSuccess = '[Reports API] Delete Report Success',
  DeleteReportFailed = '[Reports API] Delete Report Failed',
  EditReport = '[Edit Report] Report Request',
  EditReportSuccess = '[Reports API] Edit Report Success',
  EditReportFailed = '[Reports API] Edit Report Failed',
}


export class LoadingReports implements Action {
  readonly type = ReportsActionTypes.LoadingReports;
}

export class LoadingReportsSuccess implements Action {
  readonly type = ReportsActionTypes.LoadingReportsSuccess;
  constructor(public payload: { Reports: Report[]}) {}
}
export class LoadingReportsFailed implements Action {
  readonly type = ReportsActionTypes.LoadingReportsFailed;
  constructor(public error: boolean) {}
}

export class AddReport implements Action {
  readonly type = ReportsActionTypes.AddReport;
  constructor(public payload: Report) {}

}
export class AddReportFailed implements Action {

  readonly type = ReportsActionTypes.AddReportFailed;
  constructor(public error: boolean) {}

}
export class AddReportSuccess implements Action {
  readonly type = ReportsActionTypes.AddReportSuccess;
  constructor(public payload: Report) {}

}

export class DeleteReport implements Action {
  readonly type = ReportsActionTypes.DeleteReport;
  constructor(public payload:  string ) {}
}

export class DeleteReportSuccess implements Action {
  readonly type = ReportsActionTypes.DeleteReportSuccess;
  constructor(public payload:  string ) {}
}
export class DeleteReportFailed implements Action {
  readonly type = ReportsActionTypes.DeleteReportFailed;
  constructor(public error: boolean) {}
}

export class EditReport implements Action {
  readonly type = ReportsActionTypes.EditReport;
  constructor(public payload:  any ) {}
}

export class EditReportSuccess implements Action {
  readonly type = ReportsActionTypes.EditReportSuccess;
  constructor(public payload:  any ) {}
}
export class EditReportFailed implements Action {
  readonly type = ReportsActionTypes.EditReportFailed;
  constructor(public error: boolean) {}
}

export type ReportsListAction =
              LoadingReports |
              LoadingReportsSuccess |
              LoadingReportsFailed |
              AddReport |
              AddReportSuccess |
              AddReportFailed |
              DeleteReport |
              DeleteReportSuccess |
              DeleteReportFailed |
              EditReport |
              EditReportSuccess |
              EditReportFailed;

// import * as statusListAction from './building-list.actions';
// // import * as fromBuildings from './buiding-list.effects';
// import {MetaReducer, ActionReducerMap} from '@ngrx/store';
// import {Building} from '../../../../shared/models/building.model';
// import { environment } from '../../../../../environments/environment';

// export interface AppState {
//   buildings: Building[];
//   building: any;
//   loading: boolean;
//   logged: boolean;
//   error: boolean;
// }

// export const initialState: AppState = {
//   buildings: [],
//   building: null,
//   loading: true,
//   logged: false,
//   error: false,
// };


// export function BuildingsListReducers(state = initialState,
//   action: statusListAction.BuildingsListAction): AppState {
//   switch (action.type) {
//     case statusListAction.LOADING_BUILDINGS_SUCCESS: {
//       const buildings = action.payload;
//       const loading = false;
//       const logged = true;
//       const error = false;
//       return {
//       ...state,
//       buildings,
//       loading,
//       logged,
//       error
//     };
//   }

//     case statusListAction.ADD_BUILDING: {
//       // const building = action.payload;
//       // console.log('payload', building);
//       const loading = true;
//       const logged = false;
//       const error = false;
//       return {
//       ...state,
//       // building,
//       loading,
//       logged,
//       error
//     };
//   }
//   case statusListAction.ADD_BUILDING_FAILED: {
//     // const building = action.payload;
//     // console.log('payload', building);
//     const error = action.error;
//     const loading = false;
//     const logged = true;
//     return {
//     ...state,
//     // building,
//     loading,
//     logged,
//     error
//   };
// }
//   case statusListAction.ADD_BUILDING_SUCCESS: {
//     // const building = action.payload;
//     // console.log('ADDED ') ;
//     const loading = false;
//     const logged = true;
//     const error = false;
//     const building = action.payload;
//     return {
//     ...state,
//     building,
//     loading,
//     logged,
//     error,
//   };
// }
//     case statusListAction.LOADING_BUILDINGS: {
//       const loading = true;
//       const logged = false;
//       const error = false;
//       return {
//       ...state,
//       loading,
//       logged,
//       error,
//     };
//   }
//     default: return state;
// }
// }

// // export const reducers: ActionReducerMap<AppState> = {

// // };

// export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

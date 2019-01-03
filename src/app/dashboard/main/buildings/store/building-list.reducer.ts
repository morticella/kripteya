import * as buildingsListAction from './building-list.actions';
// import * as fromBuildings from './buiding-list.effects';
import {Building} from '../../../../shared/models/building.model';

export interface LoadBuildings {
  buildings: Building[];
  building: any;
  loading: boolean;
  loaded: boolean;
}

export const initialState: LoadBuildings = {
  buildings: [],
  building: null,
  loading: true,
  loaded: false
};


export function BuildingsListReducers(state = initialState,
  action: buildingsListAction.BuildingsListAction): LoadBuildings {
  switch (action.type) {
    case buildingsListAction.SUCCESS_BUILDING: {
      const buildings = action.payload;
      const loading = false;
      const loaded = true;
      return {
      ...state,
      buildings,
      loading,
      loaded
    };
  }

    case buildingsListAction.ADD_BUILDING: {
      // const building = action.payload;
      // console.log('payload', building);
      const loading = true;
      const loaded = false;
      return {
      ...state,
      //building,
      loading,
      loaded
    };
  }
  case buildingsListAction.ADDED_BUILDING: {
    // const building = action.payload;
    console.log('ADDED ') ;
    const loading = false;
    const loaded = true;
    return {
    ...state,
    // building,
    loading,
    loaded
  };
}
    case buildingsListAction.LOADING_BUILDINGS: {
      const loading = true;
      const loaded = false;

      return {
      ...state,
      loading,
      loaded
    };
  }
    default: return state;
}
}

import {AuthActionTypes} from './signup.actions';
import {Auth} from '../../../shared/models/auth.model';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { Router } from '@angular/router';
// import { Room } from 'src/app/shared/models/room.model';

export interface AuthState {
  user: string;
  token: string;
  tokenExpirationDate: Date;
  authenticated: boolean;
  loading: boolean;
  signup: boolean;
  error: boolean;
}
// export const adapter: EntityAdapter<Auth> =
//   createEntityAdapter<Auth>({selectId: auth => auth._id});


const initialState: AuthState = {
  user: null,
  token: null,
  tokenExpirationDate: null,
  authenticated: false,
  loading: false,
  signup: false,
  error: false,
};

export function AuthReducers(state: AuthState = initialState, action): AuthState {

  switch (action.type) {
    case AuthActionTypes.LoginAuth: {
      const loading = true;
      return  {
      ...state,
      loading,
    };
    }
    case AuthActionTypes.LoginAuthFailed: {
      const authenticated = false;
      const loading = false;
      const error = true;
      return {
      ...state,
      authenticated,
      loading,
      error
    };
  }
    case AuthActionTypes.LoginAuthSuccess: {
      const authenticated = true;
      const loading = false;
      const error = false;
      localStorage.getItem('token');
      localStorage.getItem('expiration');
      return {
        ...state,
        authenticated,
        loading,
        error
        };
    }
    case AuthActionTypes.LogoutAuth: {
      const loading = true;
      return  {
      ...state,
      loading,

    };
    }
    case AuthActionTypes.LogoutAuthFailed: {
      const loading = false;
      return {
      ...state,
      loading,

    };
  }
    case AuthActionTypes.LogoutAuthSuccess: {
      const authenticated = false;
      const token = null;
      const loading = false;
      return {
        ...state,
        loading,
        authenticated,
        token,
        };
    }

    case AuthActionTypes.SignUpAuth: {
      const loading = true;
      return  {
      ...state,
      loading,

    };
    }
    case AuthActionTypes.SignUpAuthFailed: {
      const authenticated = false;
      const loading = false;
      const error = true;
      return {
      ...state,
      authenticated,
      loading,
      error

    };
  }
    case AuthActionTypes.SignUpAuthSuccess: {
      const authenticated = true;
      const loading = false;
      const signup = true;
      const error = false;
      return {
        ...state,
        authenticated,
        loading,
        signup,
        error
        };
    }
    case AuthActionTypes.SetToken: {
      const authenticated = true;
      const loading = false;
      const token = action.payload;
      const error = false;
      localStorage.setItem('token', token);

      return {
        ...state,
        authenticated,
        loading,
        token,
        error
        };
    }
    case AuthActionTypes.UnSetToken: {
      const authenticated = true;
      const loading = false;
      const token = action.payload;
      const error = false;
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      return {
        ...state,
        authenticated,
        loading,
        token,
        error
        };
    }
    case AuthActionTypes.SetTokenExpiration: {
      const authenticated = true;
      const loading = false;
      const tokenExpirationDate = action.payload;
      const error = false;
      localStorage.setItem('expiration', tokenExpirationDate.toISOString());
      return {
        ...state,
        authenticated,
        loading,
        tokenExpirationDate,
        error
        };
    }
    default: return state;
}

}

// export const {
//   selectAll,
//   selectEntities,
//   selectIds,
//   selectTotal
// };


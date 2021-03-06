import {AuthActionTypes} from './signup.actions';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';


export interface AuthState {
  user: string;
  token: string;
  tokenExpirationDate: Date;
  authenticated: boolean;
  loading: boolean;
  error: boolean;
  setup: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  tokenExpirationDate: null,
  authenticated: false,
  loading: false,
  error: false,
  setup: true,
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
  case AuthActionTypes.CheckSetUp: {
    const loading = true;
    return  {
    ...state,
    loading,
  };
  }
  case AuthActionTypes.CheckSetUpSuccess: {
    const authenticated = false;
    const loading = false;
    const error = false;
    const setup = false;
    return {
    ...state,
    authenticated,
    setup,
    loading,
    error
  };
}
case AuthActionTypes.CheckSetUpFailed: {
  const authenticated = false;
  const loading = false;
  const error = false;
  const setup = true;
  return {
  ...state,
  authenticated,
  loading,
  error,
  setup,
};
}
    case AuthActionTypes.LoginAuthSuccess: {
      const authenticated = true;
      const loading = false;
      const error = false;
      const token = action.payload.token;
      const now = new Date();
      const tokenExpirationDate = new Date(now.getTime() + (1 * 60 * 60 * 1000));
      localStorage.setItem('token', token);
      localStorage.setItem('stateBuildings', undefined);
      localStorage.setItem('expiresIn', tokenExpirationDate.toISOString());

      return {
        ...state,
        authenticated,
        loading,
        token,
        // tokenExpirationDate,
        error
        };
    }

    case AuthActionTypes.LogoutAuthSuccess: {
      const authenticated = false;
      const token = null;
      const loading = false;
      localStorage.removeItem('token');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('buildingsState');

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
      const error = false;
      const token = action.payload.token;
      // const tokenExpirationDate = action.payload.expiresIn;
      localStorage.setItem('token', token);
      // localStorage.setItem('expiration', tokenExpirationDate);
      return {
        ...state,
        authenticated,
        loading,
        token,
        // tokenExpirationDate,
        error
        };
    }


    default: return state;
}

}



import {AuthActionTypes} from './signup.actions';


export interface AuthState {
  user: string;
  token: string;
  tokenExpirationDate: number;
  authenticated: boolean;
  loading: boolean;
  signup: boolean;
  error: boolean;
}

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
      const token = action.payload.token;
      const tokenExpirationDate = action.payload.expiresIn;

      localStorage.setItem('token', token);
      localStorage.setItem('expiration', tokenExpirationDate);

      return {
        ...state,
        authenticated,
        loading,
        token,
        tokenExpirationDate,
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
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
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
      const tokenExpirationDate = action.payload.expiresIn;

      localStorage.setItem('token', token);
      localStorage.setItem('expiration', tokenExpirationDate);
      return {
        ...state,
        authenticated,
        loading,
        token,
        tokenExpirationDate,
        // signup,
        error
        };
    }


    default: return state;
}

}



import { Reducer } from 'redux';
import { AuthAction } from '../actions/auth';
import {
  AUTH_LOGOUT,
  AUTH_SET_USER_INFO,
  AUTH_SET_AUTHENTICATE,
  AUTH_ON_PROGRESS,
  AUTH_ON_SUCCESS,
} from '../actions/types';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string;
  email: string;
  name: string;
}

const initState = {
  isAuthenticated: false,
  isLoading: false,
  userId: '',
  email: '',
  name: '',
};

const authState: Reducer<AuthState> = (
  state: AuthState = initState,
  action: AuthAction | any
): AuthState => {
  switch (action.type) {
    case AUTH_SET_USER_INFO: {
      return {
        ...state,
        ...action.userInfo,
      };
    }
    case AUTH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case AUTH_ON_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case AUTH_LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case AUTH_SET_AUTHENTICATE: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    }
    default:
      return state;
  }
};

export default authState;

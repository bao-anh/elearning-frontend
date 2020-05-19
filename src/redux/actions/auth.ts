import Auth from '../../models/Auth';
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  AUTH_FETCH_USER_INFO,
  AUTH_SET_USER_INFO,
  AUTH_SET_AUTHENTICATE,
  AUTH_ON_PROGRESS,
  AUTH_ON_SUCCESS,
} from '../actions/types';

export interface AuthAction {
  type: string;
  credentials?: Auth;
  userInfo?: Auth;
  isAuthenticated?: boolean;
  onError?: Function;
}

export function login(credentials: any, onError: Function): AuthAction {
  return {
    type: AUTH_LOGIN,
    credentials,
    onError,
  };
}

export function register(credentials: any, onError: Function): AuthAction {
  return {
    type: AUTH_REGISTER,
    credentials,
    onError,
  };
}

export function logout(): AuthAction {
  return {
    type: AUTH_LOGOUT,
  };
}

export function fetchUserInfo(): AuthAction {
  return {
    type: AUTH_FETCH_USER_INFO,
  };
}

export function setUserInfo(userInfo: any): AuthAction {
  return {
    type: AUTH_SET_USER_INFO,
    userInfo,
  };
}

export function setAuthenticate(isAuthenticated: any): AuthAction {
  return {
    type: AUTH_SET_AUTHENTICATE,
    isAuthenticated,
  };
}

export function fetchUserOnProgress(): AuthAction {
  return {
    type: AUTH_ON_PROGRESS,
  };
}

export function fetchUserSuccess(): AuthAction {
  return {
    type: AUTH_ON_SUCCESS,
  };
}

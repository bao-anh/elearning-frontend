import {
  SET_FETCH_DATA,
  SET_SET_DATA,
  SET_ADD_DATA,
  SET_FETCH_ON_PROGRESS,
  SET_FETCH_SUCCESS,
} from '../actions/types';

export interface SetAction {
  type: string;
  set?: any;
  onError?: any;
  onSuccess?: any;
}

export function fetchSet(onError: any): SetAction {
  return {
    type: SET_FETCH_DATA,
    onError,
  };
}

export function addSet(set: any, onError: any, onSuccess: any): SetAction {
  return {
    type: SET_ADD_DATA,
    set,
    onError,
    onSuccess,
  };
}

export function setSet(set: any): SetAction {
  return {
    type: SET_SET_DATA,
    set,
  };
}

export function fetchSetOnProgress(): SetAction {
  return {
    type: SET_FETCH_ON_PROGRESS,
  };
}

export function fetchSetSuccess(): SetAction {
  return {
    type: SET_FETCH_SUCCESS,
  };
}

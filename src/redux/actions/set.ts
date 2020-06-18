import {
  SET_FETCH_DATA,
  SET_FETCH_BY_ID,
  SET_SET_DATA,
  SET_SET_CURRENT,
  SET_ADD_DATA,
  SET_UPDATE_DATA,
  SET_FETCH_ON_PROGRESS,
  SET_FETCH_SUCCESS,
  SET_MODIFY_TERM,
  SET_DELETE_TERM,
} from '../actions/types';

export interface SetAction {
  type: string;
  set?: any;
  onError?: any;
  onSuccess?: any;
  setId?: any;
  termId?: any;
  createArray?: any;
  updateWithImageArray?: any;
  updateWithOutImageArray?: any;
  isUpdateWithImage?: any;
}

export function fetchSet(onError: any): SetAction {
  return {
    type: SET_FETCH_DATA,
    onError,
  };
}

export function fetchSetById(setId: any, onError: any): SetAction {
  return {
    type: SET_FETCH_BY_ID,
    setId,
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

export function updateSet(
  set: any,
  setId: any,
  isUpdateWithImage: any,
  onError: any,
  onSuccess: any
): SetAction {
  return {
    type: SET_UPDATE_DATA,
    set,
    setId,
    isUpdateWithImage,
    onError,
    onSuccess,
  };
}

export function modifyTermBySetId(
  setId: any,
  createArray: any,
  updateWithImageArray: any,
  updateWithOutImageArray: any,
  onError: any,
  onSuccess: any
): SetAction {
  return {
    type: SET_MODIFY_TERM,
    setId,
    createArray,
    updateWithImageArray,
    updateWithOutImageArray,
    onError,
    onSuccess,
  };
}

export function deleteTermBySetId(
  setId: any,
  termId: any,
  onError: any,
  onSuccess: any
) {
  return {
    type: SET_DELETE_TERM,
    setId,
    termId,
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

export function setCurrentSet(set: any): SetAction {
  return {
    type: SET_SET_CURRENT,
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

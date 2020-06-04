import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import {
  SET_FETCH_DATA,
  SET_ADD_DATA,
  SET_FETCH_BY_ID,
  SET_MODIFY_TERM,
  SET_DELETE_TERM,
} from '../actions/types';

import {
  fetchSetOnProgress,
  fetchSetSuccess,
  setSet,
  setCurrentSet,
} from '../actions/set';

export const getSet = () => {
  return api.get('/sets');
};

export const getSetById = (setId: any) => {
  return api.get(`/sets/${setId}`);
};

export const postSet = (set: any) => {
  return api.post('/sets', set, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const postTermBySetId = (setId: any, payload: any) => {
  return api.post(`/sets/${setId}/terms`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const putTermWithImage = (termId: any, payload: any) => {
  return api.put(`/sets/terms/${termId}/with-image`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const putTermWithOutImage = (termId: any, payload: any) => {
  return api.put(`/sets/terms/${termId}/without-image`, payload);
};

export const deleteTerm = (setId: any, termId: any) => {
  return api.delete(`/sets/${setId}/terms/${termId}`);
};

export function* fetchSet(action: any) {
  try {
    yield put(fetchSetOnProgress());
    const response = yield call(getSet);
    yield put(setSet(response.data));
    yield put(fetchSetSuccess());
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* fetchSetById(action: any) {
  try {
    yield put(fetchSetOnProgress());
    const response = yield call(getSetById, action.setId);
    yield put(setCurrentSet(response.data));
    yield put(fetchSetSuccess());
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* addSet(action: any) {
  try {
    yield call(postSet, action.set);
    const response = yield call(getSetById, action.setId);
    yield put(setSet(response.data));
    action.onSuccess();
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* modifyTermBySetId(action: any) {
  try {
    for (let i = 0; i < action.createArray.length; i++) {
      yield call(postTermBySetId, action.setId, action.createArray[i]);
    }
    for (let i = 0; i < action.updateWithImageArray.length; i++) {
      yield call(
        putTermWithImage,
        action.updateWithImageArray[i].termId,
        action.updateWithImageArray[i].payload
      );
    }
    for (let i = 0; i < action.updateWithOutImageArray.length; i++) {
      console.log(action.updateWithOutImageArray[i]);
      yield call(
        putTermWithOutImage,
        action.updateWithOutImageArray[i].termId,
        action.updateWithOutImageArray[i].payload
      );
    }
    action.onSuccess();
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* deleteTermBySetId(action: any) {
  try {
    yield call(deleteTerm, action.setId, action.termId);
    action.onSuccess(action.termId);
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* watchFetchSet() {
  yield takeLatest(SET_FETCH_DATA, fetchSet);
}

export function* watchFetchSetById() {
  yield takeLatest(SET_FETCH_BY_ID, fetchSetById);
}

export function* watchAddSet() {
  yield takeLatest(SET_ADD_DATA, addSet);
}

export function* watchModifyTermBySetId() {
  yield takeLatest(SET_MODIFY_TERM, modifyTermBySetId);
}

export function* watchDeleteTermBySetId() {
  yield takeLatest(SET_DELETE_TERM, deleteTermBySetId);
}

export default function* set() {
  yield fork(watchFetchSet);
  yield fork(watchAddSet);
  yield fork(watchFetchSetById);
  yield fork(watchModifyTermBySetId);
  yield fork(watchDeleteTermBySetId);
}

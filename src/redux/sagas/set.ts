import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import { SET_FETCH_DATA, SET_ADD_DATA } from '../actions/types';

import { fetchSetOnProgress, fetchSetSuccess, setSet } from '../actions/set';

export const getSet = () => {
  return api.get('/sets');
};

export const postSet = (set: any) => {
  return api.post('/sets', set, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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

export function* addSet(action: any) {
  try {
    yield call(postSet, action.set);
    const response = yield call(getSet);
    yield put(setSet(response.data));
    action.onSuccess();
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* watchFetchSet() {
  yield takeLatest(SET_FETCH_DATA, fetchSet);
}

export function* watchAddSet() {
  yield takeLatest(SET_ADD_DATA, addSet);
}

export default function* set() {
  yield fork(watchFetchSet);
  yield fork(watchAddSet);
}

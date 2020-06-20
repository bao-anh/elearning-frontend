import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import { handleRedirectWhenServerError } from '../../utils';
import Routes from '../../routes';
import { SCALE_FETCH_DATA } from '../actions/types';

import {
  fetchScaleOnProgress,
  fetchScaleSuccess,
  setScale,
} from '../actions/scale';

export const getScale = () => {
  return api.get('/scales');
};

export function* fetchScale() {
  try {
    yield put(fetchScaleOnProgress());
    const response = yield call(getScale);
    yield put(setScale(response.data));
    yield put(fetchScaleSuccess());
  } catch (err) {
    handleRedirectWhenServerError(err, Routes);
    console.log(err.response);
  }
}

export function* watchFetchScale() {
  yield takeLatest(SCALE_FETCH_DATA, fetchScale);
}

export default function* scale() {
  yield fork(watchFetchScale);
}

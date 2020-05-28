import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
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
    console.log(err);
  }
}

export function* watchFetchScale() {
  yield takeLatest(SCALE_FETCH_DATA, fetchScale);
}

export default function* toeic() {
  yield fork(watchFetchScale);
}

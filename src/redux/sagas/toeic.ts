import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import { TOEIC_FETCH_BY_USER_ID, TOEIC_SUBMIT_SCORE } from '../actions/types';

import {
  setToeic,
  fetchToeicOnProgress,
  fetchToeicSuccess,
} from '../actions/toeic';
import { fetchUserInfo } from '../actions/auth';

export const getToeicByUserId = () => {
  return api.get('/toeic');
};

export const postToeicScore = (currentScore: any, targetScore: any) => {
  return api.post('/toeic/scores', { currentScore, targetScore });
};

export const putToeicScore = (targetScore: any) => {
  return api.put('/toeic/scores', { targetScore });
};

export function* fetchToeicByUserId() {
  try {
    yield put(fetchToeicOnProgress());
    const response = yield call(getToeicByUserId);
    yield put(setToeic(response.data));
    yield put(fetchToeicSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* submitToeicScore(action: any) {
  try {
    yield put(fetchToeicOnProgress());
    if (action.currentScore) {
      yield call(postToeicScore, action.currentScore, action.targetScore);
      yield put(fetchUserInfo());
      const response = yield call(getToeicByUserId);
      yield put(setToeic(response.data));
    } else {
    }
    yield put(fetchToeicSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchToeicByUserId() {
  yield takeLatest(TOEIC_FETCH_BY_USER_ID, fetchToeicByUserId);
}

export function* watchsubmitToeicScore() {
  yield takeLatest(TOEIC_SUBMIT_SCORE, submitToeicScore);
}

export default function* toeic() {
  yield fork(watchFetchToeicByUserId);
  yield fork(watchsubmitToeicScore);
}

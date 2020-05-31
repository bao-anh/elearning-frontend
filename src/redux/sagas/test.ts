import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import {
  fetchTestOnProgress,
  fetchTestSuccess,
  setTest,
} from '../actions/test';
import { TEST_FETCH_DATA } from '../actions/types';
import { getLeaderboard } from './toeic';

export const postTestByType = (testType: any) => {
  return api.post('/tests/random', { testType });
};

export const postTest = (payload: any) => {
  return api.post('/tests', payload);
};

export const getLeaderBoard = (partId: number) => {
  return api.get(`/tests/leaderboard/${partId}`);
};

export const getTestResult = (participantId: number) => {
  return api.get(`/tests/${participantId}`);
};

export function* fetchTestByType(action: any) {
  try {
    yield put(fetchTestOnProgress());
    const response = yield call(postTestByType, action.testType);
    let toeicStateData = {};
    if (!isNaN(Number(action.testType))) {
      const leaderboard = yield call(getLeaderBoard, Number(action.testType));
      toeicStateData = {
        ...toeicStateData,
        name: `Part ${Number(action.testType)}`,
        questionIds: response.data.randomQuestionIds,
        participantIds: response.data.participantIds,
        leaderboard: leaderboard.data,
        duration: 600,
      };
    } else if (action.testType === 'short-test') {
      const leaderboard = yield call(getLeaderboard);
      toeicStateData = {
        ...toeicStateData,
        name: 'Bài thi rút gọn',
        questionIds: response.data.randomQuestionIds,
        participantIds: response.data.participantIds,
        leaderboard: leaderboard.data,
        duration: 1200,
      };
    } else if (action.testType === 'full-test') {
      const leaderboard = yield call(getLeaderboard);
      toeicStateData = {
        ...toeicStateData,
        name: 'Bài thi hoàn chỉnh',
        questionIds: response.data.randomQuestionIds,
        participantIds: response.data.participantIds,
        leaderboard: leaderboard.data,
        duration: 3600,
      };
    }
    yield put(setTest(toeicStateData));
    yield put(fetchTestSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchTestByType() {
  yield takeLatest(TEST_FETCH_DATA, fetchTestByType);
}

export default function* test() {
  yield fork(watchFetchTestByType);
}

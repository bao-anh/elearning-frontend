import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import {
  fetchTestOnProgress,
  fetchTestSuccess,
  setTest,
} from '../actions/test';
import { TEST_FETCH_DATA } from '../actions/types';

export const postTestByType = (testType: any) => {
  return api.post('/tests/random', { testType });
};

export const postTest = (payload: any) => {
  return api.post('/tests', payload);
};

export function* fetchTestByType(action: any) {
  try {
    yield put(fetchTestOnProgress());
    const response = yield call(postTestByType, action.testType);
    let toeicStateData = {};
    if (!isNaN(Number(action.testType))) {
      toeicStateData = {
        ...toeicStateData,
        name: `Part ${Number(action.testType)}`,
        questionIds: response.data.randomQuestionIds,
        participantIds: response.data.participantIds,
        duration: 600,
      };
    } else {
      toeicStateData = {
        ...toeicStateData,
        name: 'Bài thi rút gọn',
        questionIds: response.data.randomQuestionIds,
        participantIds: response.data.participantIds,
        duration: 1200,
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

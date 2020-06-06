import { select, call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import { shuffleArray } from '../../utils';
import {
  fetchLearnOnProgress,
  fetchLearnSuccess,
  setWrite,
  setListen,
} from '../actions/learn';
import {
  LEARN_FETCH_WRITE_BY_SET_ID,
  LEARN_FETCH_LISTEN_BY_SET_ID,
  LEARN_UPDATE_REMEMBER,
} from '../actions/types';

export const getSetById = (setId: any) => {
  return api.get(`/sets/${setId}`);
};

export const putTermUpdateRemeber = (
  setId: any,
  correct: any,
  incorrect: any
) => {
  return api.put(`/terms/${setId}`, { correct, incorrect });
};

export function* fetchWriteBySetId(action: any) {
  try {
    yield put(fetchLearnOnProgress());
    const response = yield call(getSetById, action.setId);
    const termIds = response.data.termIds;
    const write = {
      termIds: termIds,
      remain: shuffleArray(termIds),
      correct: [],
      incorrect: [],
    };
    yield put(setWrite(write));
    yield put(fetchLearnSuccess());
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* fetchListenBySetId(action: any) {
  try {
    yield put(fetchLearnOnProgress());
    const response = yield call(getSetById, action.setId);
    const termIds = response.data.termIds;
    const listent = {
      termIds: termIds,
      remain: shuffleArray(termIds),
      correct: [],
      incorrect: [],
    };
    yield put(setListen(listent));
    yield put(fetchLearnSuccess());
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* updateRemember(action: any) {
  try {
    if (action.practiceType === 'write') {
      const correct = yield select((state) => state.learnState.write.correct);
      const incorrect = yield select(
        (state) => state.learnState.write.incorrect
      );
      yield call(putTermUpdateRemeber, action.setId, correct, incorrect);
      action.onSuccess();
    } else if (action.practiceType === 'listen') {
      const correct = yield select((state) => state.learnState.write.correct);
      const incorrect = yield select(
        (state) => state.learnState.write.incorrect
      );
      yield call(putTermUpdateRemeber, action.setId, correct, incorrect);
      action.onSuccess();
    }
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* watchFetchWriteBySetId() {
  yield takeLatest(LEARN_FETCH_WRITE_BY_SET_ID, fetchWriteBySetId);
}

export function* watchFetchListenBySetId() {
  yield takeLatest(LEARN_FETCH_LISTEN_BY_SET_ID, fetchListenBySetId);
}

export function* watchUpdateRemember() {
  yield takeLatest(LEARN_UPDATE_REMEMBER, updateRemember);
}

export default function* learn() {
  yield fork(watchFetchWriteBySetId);
  yield fork(watchUpdateRemember);
  yield fork(watchFetchListenBySetId);
}
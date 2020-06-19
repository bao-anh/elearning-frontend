import { select, call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import { shuffleArray } from '../../utils';
import {
  fetchLearnOnProgress,
  fetchLearnSuccess,
  setWrite,
  setListen,
  setStudy,
  setAllWrite,
  setAllListen,
  setAllStudy,
} from '../actions/learn';
import {
  LEARN_FETCH_WRITE_BY_SET_ID,
  LEARN_FETCH_LISTEN_BY_SET_ID,
  LEARN_FETCH_STUDY_BY_SET_ID,
  LEARN_UPDATE_REMEMBER,
  LEARN_FETCH_ALL_WRITE,
  LEARN_FETCH_ALL_LISTEN,
  LEARN_FETCH_ALL_STUDY,
} from '../actions/types';
import { getSet } from './set';

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
    yield put(setWrite(write, action.setId));
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
    const listen = {
      termIds: termIds,
      remain: shuffleArray(termIds),
      correct: [],
      incorrect: [],
    };
    yield put(setListen(listen, action.setId));
    yield put(fetchLearnSuccess());
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* fetchStudyBySetId(action: any) {
  try {
    yield put(fetchLearnOnProgress());
    const response = yield call(getSetById, action.setId);
    const termIds = response.data.termIds;
    const study = {
      termIds: termIds,
      remain: termIds,
      familiar: [],
      mastered: [],
      current: termIds[0],
    };
    yield put(setStudy(study, action.setId));
    yield put(fetchLearnSuccess());
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* updateRemember(action: any) {
  try {
    if (action.practiceType === 'write') {
      const correct = yield select(
        (state) => state.learnState[action.setId].write.correct
      );
      const incorrect = yield select(
        (state) => state.learnState[action.setId].write.incorrect
      );
      yield call(putTermUpdateRemeber, action.setId, correct, incorrect);
      action.onSuccess();
    } else if (action.practiceType === 'listen') {
      const correct = yield select(
        (state) => state.learnState[action.setId].listen.correct
      );
      const incorrect = yield select(
        (state) => state.learnState[action.setId].listen.incorrect
      );
      yield call(putTermUpdateRemeber, action.setId, correct, incorrect);
      action.onSuccess();
    }
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* fetchAllWrite(action: any) {
  try {
    yield put(fetchLearnOnProgress());
    const response = yield call(getSet);
    const termIds = response.data.reduce(
      (acc: any, setIds: any) => [...acc, ...setIds.termIds],
      []
    );
    const write = {
      termIds: termIds,
      remain: shuffleArray(termIds),
      correct: [],
      incorrect: [],
    };
    yield put(setAllWrite(write));
    yield put(fetchLearnSuccess());
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* fetchAllListen(action: any) {
  try {
    yield put(fetchLearnOnProgress());
    const response = yield call(getSet);
    const termIds = response.data.reduce(
      (acc: any, setIds: any) => [...acc, ...setIds.termIds],
      []
    );
    const listen = {
      termIds: termIds,
      remain: shuffleArray(termIds),
      correct: [],
      incorrect: [],
    };
    yield put(setAllListen(listen));
    yield put(fetchLearnSuccess());
  } catch (err) {
    action.onError(err.response.data);
    console.log(err);
  }
}

export function* fetchAllStudy(action: any) {
  try {
    yield put(fetchLearnOnProgress());
    const response = yield call(getSet);
    const termIds = response.data.reduce(
      (acc: any, setIds: any) => [...acc, ...setIds.termIds],
      []
    );
    const study = {
      termIds: termIds,
      remain: termIds,
      familiar: [],
      mastered: [],
      current: termIds[0],
    };
    yield put(setAllStudy(study));
    yield put(fetchLearnSuccess());
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

export function* watchFetchStudyBySetId() {
  yield takeLatest(LEARN_FETCH_STUDY_BY_SET_ID, fetchStudyBySetId);
}

export function* watchUpdateRemember() {
  yield takeLatest(LEARN_UPDATE_REMEMBER, updateRemember);
}

export function* watchFetchAllWrite() {
  yield takeLatest(LEARN_FETCH_ALL_WRITE, fetchAllWrite);
}

export function* watchFetchAllListen() {
  yield takeLatest(LEARN_FETCH_ALL_LISTEN, fetchAllListen);
}

export function* watchFetchAllStudy() {
  yield takeLatest(LEARN_FETCH_ALL_STUDY, fetchAllStudy);
}

export default function* learn() {
  yield fork(watchFetchWriteBySetId);
  yield fork(watchUpdateRemember);
  yield fork(watchFetchListenBySetId);
  yield fork(watchFetchStudyBySetId);
  yield fork(watchFetchAllWrite);
  yield fork(watchFetchAllListen);
  yield fork(watchFetchAllStudy);
}

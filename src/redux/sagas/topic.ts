import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { callElearningApi } from '../../services';
import {
  setLargeTopic,
  setSmallTopic,
  fetchLargeTopicSuccess,
  fetchSmallTopicSuccess,
  fetchLargeTopicOnProgress,
  fetchSmallTopicOnProgress,
} from '../actions/topic';
import {
  TOPIC_FETCH_LARGE_BY_PARENT_ID,
  TOPIC_FETCH_SMALL_BY_PARENT_ID,
  TOPIC_FETCH_LARGE_BY_TOPIC_ID,
  TOPIC_FETCH_SMALL_BY_TOPIC_ID,
} from '../actions/types';

export const getTopicByParentId = (parentId: number) => {
  return callElearningApi({
    url: `get-topic-by-parent-id?parentId=${parentId}&offset=0&limit=-1`,
    params: null,
    method: 'post',
  });
};

export const getTopicByTopicId = (topicId: number) => {
  return callElearningApi({
    url: `get-topic-by-id?topicId=${topicId}`,
    params: null,
    method: 'post',
  });
};

export function* fetchLargeTopicByParentId(action: any) {
  try {
    yield put(fetchLargeTopicOnProgress());
    const response = yield call(getTopicByParentId, action.parentId);
    yield put(setLargeTopic(response));
    yield put(fetchLargeTopicSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* fetchSmallTopicByParentId(action: any) {
  try {
    yield put(fetchSmallTopicOnProgress());
    const response = yield call(getTopicByParentId, action.parentId);
    yield put(setSmallTopic(response));
    yield put(fetchSmallTopicSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* fetchLargeTopicByTopicId(action: any) {
  try {
    yield put(fetchLargeTopicOnProgress());
    const response = yield call(getTopicByTopicId, action.topicId);
    yield put(setLargeTopic(response));
    yield put(fetchLargeTopicSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* fetchSmallTopicByTopicId(action: any) {
  try {
    yield put(fetchSmallTopicOnProgress());
    const response = yield call(getTopicByTopicId, action.topicId);
    yield put(setSmallTopic(response));
    yield put(fetchSmallTopicSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchLargeTopicByParentId() {
  yield takeLatest(TOPIC_FETCH_LARGE_BY_PARENT_ID, fetchLargeTopicByParentId);
}

export function* watchFetchSmallTopicByParentId() {
  yield takeLatest(TOPIC_FETCH_SMALL_BY_PARENT_ID, fetchSmallTopicByParentId);
}

export function* watchFetchLargeTopicByTopicId() {
  yield takeLatest(TOPIC_FETCH_LARGE_BY_TOPIC_ID, fetchLargeTopicByTopicId);
}

export function* watchFetchSmallTopicByTopicId() {
  yield takeLatest(TOPIC_FETCH_SMALL_BY_TOPIC_ID, fetchSmallTopicByTopicId);
}

export default function* course() {
  yield fork(watchFetchLargeTopicByParentId);
  yield fork(watchFetchSmallTopicByParentId);
  yield fork(watchFetchLargeTopicByTopicId);
  yield fork(watchFetchSmallTopicByTopicId);
}

import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import {
  setLargeTopic,
  setSmallTopic,
  fetchLargeTopicOnProgress,
  fetchSmallTopicOnProgress,
  fetchLargeTopicSuccess,
  fetchSmallTopicSuccess,
} from '../actions/topic';
import {
  TOPIC_FETCH_BY_COURSE_ID,
  TOPIC_FETCH_BY_TOPIC_ID,
} from '../actions/types';

export const getTopicByCourseId = (courseId: any) => {
  return api.get(`/courses/${courseId}/topics`);
};

export const getTopicByTopicId = (topicId: any) => {
  return api.get(`/topics/${topicId}`);
};

export function* fetchTopicByCourseId(action: any) {
  try {
    yield put(fetchLargeTopicOnProgress());
    const response = yield call(getTopicByCourseId, action.courseId);
    yield put(setLargeTopic(response.data));
    yield put(fetchLargeTopicSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* fetchTopicByTopicId(action: any) {
  try {
    yield put(fetchSmallTopicOnProgress());
    const response = yield call(getTopicByTopicId, action.topicId);
    yield put(setSmallTopic(response.data));
    yield put(fetchSmallTopicSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchTopicByCourseId() {
  yield takeLatest(TOPIC_FETCH_BY_COURSE_ID, fetchTopicByCourseId);
}

export function* watchFetchTopicByTopicId() {
  yield takeLatest(TOPIC_FETCH_BY_TOPIC_ID, fetchTopicByTopicId);
}

export default function* course() {
  yield fork(watchFetchTopicByCourseId);
  yield fork(watchFetchTopicByTopicId);
}

import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import { handleRedirectWhenServerError } from '../../utils';
import Routes from '../../routes';
import {
  setLesson,
  fetchLessonOnProgress,
  fetchLessonSuccess,
} from '../actions/lesson';
import { LESSON_FETCH_BY_LESSON_ID } from '../actions/types';

export const getLessonByLessonId = (lessonId: any) => {
  return api.get(`/lessons/${lessonId}`);
};

export function* fetchLessonByLessonId(action: any) {
  try {
    yield put(fetchLessonOnProgress());
    const response = yield call(getLessonByLessonId, action.lessonId);
    yield put(setLesson(response.data));
    yield put(fetchLessonSuccess());
  } catch (err) {
    handleRedirectWhenServerError(err, Routes);
    console.log(err.response);
  }
}

export function* watchFetchLessonByLessonId() {
  yield takeLatest(LESSON_FETCH_BY_LESSON_ID, fetchLessonByLessonId);
}

export default function* lesson() {
  yield fork(watchFetchLessonByLessonId);
}

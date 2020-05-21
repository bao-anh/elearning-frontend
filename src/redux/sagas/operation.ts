import { call, put, fork, takeLatest } from 'redux-saga/effects';
import {
  setSmallTopic,
  fetchTopicByCourseId,
  fetchTopicByTopicId,
  fetchSmallTopicOnProgress,
  fetchSmallTopicSuccess,
} from '../actions/topic';
import {
  setLesson,
  fetchLessonOnProgress,
  fetchLessonSuccess,
} from '../actions/lesson';
import {
  fetchAllCourse,
  fetchCourseByUserId,
  fetchCourseByCategoryId,
} from '../actions/course';
import { fetchAllCategory, setCurrentCategory } from '../actions/category';
import {
  OPERATION_FETCH_DATA_IN_LESSON_PAGE,
  OPERATION_FETCH_DATA_IN_COURSE_PAGE,
  OPERATION_FETCH_DATA_IN_TOPIC_PAGE,
  OPERATION_FETCH_DATA_IN_CATEGORY_PAGE,
} from '../actions/types';

import { getLessonByLessonId } from './lesson';
import { getTopicByTopicId } from './topic';

export function* fetchDataInCategoryPage(action: any) {
  try {
    if (action.params.id === 'all') {
      yield put(fetchAllCategory());
      yield put(setCurrentCategory(action.params.id));
      yield put(fetchAllCourse());
    } else if (action.params.id === 'me') {
      yield put(fetchCourseByUserId(action.userId));
      yield put(setCurrentCategory(action.params.id));
    } else {
      yield put(setCurrentCategory(action.params.id));
      yield put(fetchCourseByCategoryId(action.params.id));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* fetchDataInCoursePage(action: any) {
  try {
    yield put(fetchTopicByCourseId(action.courseId));
  } catch (err) {
    console.log(err);
  }
}

export function* fetchDataInTopicPage(action: any) {
  try {
    // We cant use directly fetchTopicByTopicId because by that way we cant take the real data
    yield put(fetchSmallTopicOnProgress());
    const response = yield call(getTopicByTopicId, action.topicId);
    yield put(setSmallTopic(response.data));
    yield put(fetchSmallTopicSuccess());

    yield put(fetchTopicByCourseId(response.data.courseId));
  } catch (err) {
    console.log(err);
  }
}

export function* fetchDataInLessonPage(action: any) {
  try {
    yield put(fetchLessonOnProgress());
    const response = yield call(getLessonByLessonId, action.lessonId);
    yield put(setLesson(response.data));
    yield put(fetchLessonSuccess());

    yield put(fetchTopicByTopicId(response.data.topicId));
    yield put(fetchTopicByCourseId(response.data.courseId));
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchDataInCategoryPage() {
  yield takeLatest(
    OPERATION_FETCH_DATA_IN_CATEGORY_PAGE,
    fetchDataInCategoryPage
  );
}

export function* watchFetchDataInCoursePage() {
  yield takeLatest(OPERATION_FETCH_DATA_IN_COURSE_PAGE, fetchDataInCoursePage);
}

export function* watchFetchDataInTopicPage() {
  yield takeLatest(OPERATION_FETCH_DATA_IN_TOPIC_PAGE, fetchDataInTopicPage);
}

export function* watchFetchDataInLessonPage() {
  yield takeLatest(OPERATION_FETCH_DATA_IN_LESSON_PAGE, fetchDataInLessonPage);
}

export default function* operation() {
  yield fork(watchFetchDataInLessonPage);
  yield fork(watchFetchDataInCoursePage);
  yield fork(watchFetchDataInTopicPage);
  yield fork(watchFetchDataInCategoryPage);
}

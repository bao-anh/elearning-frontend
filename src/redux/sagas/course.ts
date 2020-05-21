import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import {
  setCourse,
  fetchCourseSuccess,
  fetchCourseOnProgress,
} from '../actions/course';
import {
  COURSE_FETCH_ALL,
  COURSE_FETCH_BY_USER_ID,
  COURSE_FETCH_BY_CATEGORY_ID,
} from '../actions/types';

export const getAllCourse = () => {
  return api.get('/courses');
};

export const getCourseByCategoryId = (categoryId: number) => {
  return api.get(`/categories/${categoryId}/courses`);
};

export const getCourseByUserId = (userId: number) => {
  return api.get(`/users/${userId}/courses`);
};

export function* fetchAllCourse() {
  try {
    yield put(fetchCourseOnProgress());
    const response = yield call(getAllCourse);
    yield put(setCourse(response.data));
    yield put(fetchCourseSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* fetchCourseByCategoryId(action: any) {
  try {
    yield put(fetchCourseOnProgress());
    const response = yield call(getCourseByCategoryId, action.categoryId);
    yield put(setCourse(response.data.courseIds));
    yield put(fetchCourseSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* fetchCourseByUserId(action: any) {
  try {
    yield put(fetchCourseOnProgress());
    const response = yield call(getCourseByUserId, action.userId);
    yield put(setCourse(response.data.courseIds));
    yield put(fetchCourseSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchAllCourse() {
  yield takeLatest(COURSE_FETCH_ALL, fetchAllCourse);
}

export function* watchFetchCourseByCategoryId() {
  yield takeLatest(COURSE_FETCH_BY_CATEGORY_ID, fetchCourseByCategoryId);
}

export function* watchFetchCourseByUserId() {
  yield takeLatest(COURSE_FETCH_BY_USER_ID, fetchCourseByUserId);
}

export default function* course() {
  yield fork(watchFetchAllCourse);
  yield fork(watchFetchCourseByCategoryId);
  yield fork(watchFetchCourseByUserId);
}

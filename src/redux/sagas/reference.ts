import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { callElearningApi } from '../../services';
import {
  setReference,
  fetchReferenceSuccess,
  fetchReferenceOnProgress,
} from '../actions/reference';
import {
  REFERENCE_FETCH_BY_PARENT_ID,
  REFERENCE_FETCH_BY_COURSE_ID,
} from '../actions/types';

const getReferenceByParentId = (parentId: number) => {
  return callElearningApi({
    url: `get-document-by-parent-id?parentId=${parentId}&offset=0&limit=-1`,
    params: null,
    method: 'post',
  });
};

const getReferenceByCourseId = (courseId: number) => {
  return callElearningApi({
    url: `get-document-by-course-id?courseId=${courseId}`,
    params: null,
    method: 'post',
  });
};

export function* fetchReferenceByParentId(action: any) {
  try {
    yield put(fetchReferenceOnProgress());
    const response = yield call(getReferenceByParentId, action.parentId);
    yield put(setReference(response));
    yield put(fetchReferenceSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* fetchReferenceByCourseId(action: any) {
  try {
    yield put(fetchReferenceOnProgress());
    const response = yield call(getReferenceByCourseId, action.courseId);
    yield put(setReference(response));
    yield put(fetchReferenceSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchReferenceByParentId() {
  yield takeLatest(REFERENCE_FETCH_BY_PARENT_ID, fetchReferenceByParentId);
}

export function* watchFetchReferenceByCourseId() {
  yield takeLatest(REFERENCE_FETCH_BY_COURSE_ID, fetchReferenceByCourseId);
}

export default function* reference() {
  yield fork(watchFetchReferenceByParentId);
  yield fork(watchFetchReferenceByCourseId);
}

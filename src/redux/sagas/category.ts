import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { callElearningApi } from '../../services';
import {
  setCategory,
  fetchCategorySuccess,
  fetchCategoryOnProgress,
} from '../actions/category';
import { CATEGORY_FETCH_ALL } from '../actions/types';

const fetchAllCategory = () => {
  return callElearningApi({
    url: `get-categories`,
    params: null,
    method: 'post',
  });
};

export function* fetchCategory() {
  try {
    yield put(fetchCategoryOnProgress());
    const response = yield call(fetchAllCategory);
    yield put(setCategory(response));
    yield put(fetchCategorySuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetch() {
  yield takeLatest(CATEGORY_FETCH_ALL, fetchCategory);
}

export default function* category() {
  yield fork(watchFetch);
}

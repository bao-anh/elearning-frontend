import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import {
  setCategory,
  fetchCategorySuccess,
  fetchCategoryOnProgress,
} from '../actions/category';
import { CATEGORY_FETCH_ALL } from '../actions/types';

const getAllCategory = () => {
  return api.get('/categories/get-all-with-course');
};

export function* fetchAllCategory() {
  try {
    yield put(fetchCategoryOnProgress());
    const response = yield call(getAllCategory);
    yield put(setCategory(response.data));
    yield put(fetchCategorySuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetch() {
  yield takeLatest(CATEGORY_FETCH_ALL, fetchAllCategory);
}

export default function* category() {
  yield fork(watchFetch);
}

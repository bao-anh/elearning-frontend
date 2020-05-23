import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import {
  fetchAssignmentOnProgress,
  fetchAssignmentSuccess,
  setAssignment,
} from '../actions/assignment';
import { ASSIGNMENT_FETCH_BY_ASSIGNMENT_ID } from '../actions/types';

export const getAssignmentByAssignmentId = (assignmentId: any) => {
  return api.get(`/assignments/${assignmentId}`);
};

export function* fetchAssignmentByAssignmentId(action: any) {
  try {
    yield put(fetchAssignmentOnProgress());
    const response = yield call(
      getAssignmentByAssignmentId,
      action.assignmentId
    );
    yield put(setAssignment(response.data));
    yield put(fetchAssignmentSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchAssignmentByAssignmentId() {
  yield takeLatest(
    ASSIGNMENT_FETCH_BY_ASSIGNMENT_ID,
    fetchAssignmentByAssignmentId
  );
}

export default function* assignment() {
  yield fork(watchFetchAssignmentByAssignmentId);
}

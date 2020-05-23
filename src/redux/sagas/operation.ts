import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import {
  setSmallTopic,
  fetchTopicByCourseId,
  fetchTopicByTopicId,
  fetchSmallTopicOnProgress,
  fetchSmallTopicSuccess,
  fetchLargeTopicOnProgress,
} from '../actions/topic';
import {
  setLesson,
  fetchLessonOnProgress,
  fetchLessonSuccess,
} from '../actions/lesson';
import {
  fetchAssignmentOnProgress,
  fetchAssignmentSuccess,
  setAssignment,
} from '../actions/assignment';
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
  OPERATION_FETCH_DATA_IN_ASSIGNMENT_PAGE,
  OPERATION_SUBMIT_ASSIGNMENT,
} from '../actions/types';

import { getLessonByLessonId } from './lesson';
import { getTopicByTopicId } from './topic';
import { getAssignmentByAssignmentId } from './assignment';
import { getParticipantSubmitAssignment } from './participant';

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
    yield put(fetchLargeTopicOnProgress());
    const response = yield call(getLessonByLessonId, action.lessonId);
    yield put(setLesson(response.data));
    yield put(fetchLessonSuccess());

    yield put(fetchTopicByTopicId(response.data.topicId));
    yield put(fetchTopicByCourseId(response.data.courseId));
  } catch (err) {
    console.log(err);
  }
}

export function* fetchDataInAssignmentPage(action: any) {
  try {
    yield put(fetchAssignmentOnProgress());
    yield put(fetchSmallTopicOnProgress());
    const response = yield call(
      getAssignmentByAssignmentId,
      action.assignmentId
    );
    yield put(setAssignment(response.data));
    yield put(fetchAssignmentSuccess());

    yield put(fetchTopicByTopicId(response.data.topicId));
    yield put(fetchTopicByCourseId(response.data.courseId));
  } catch (err) {
    console.log(err);
  }
}

export function* submitAssignment(action: any) {
  try {
    const userInfo = yield select((state) => state.authState);
    const payload = {
      userId: userInfo._id,
      assignmentId: action.assignmentId,
      userAnswer: action.userAnswer,
      score: action.score,
    };
    yield call(getParticipantSubmitAssignment, payload);
    const assignment = yield call(
      getAssignmentByAssignmentId,
      action.assignmentId
    );
    yield put(setAssignment(assignment.data));
    action.onSuccess();
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

export function* watchFetchDataInAssignmentPage() {
  yield takeLatest(
    OPERATION_FETCH_DATA_IN_ASSIGNMENT_PAGE,
    fetchDataInAssignmentPage
  );
}

export function* watchSubmitAssignment() {
  yield takeLatest(OPERATION_SUBMIT_ASSIGNMENT, submitAssignment);
}

export default function* operation() {
  yield fork(watchFetchDataInLessonPage);
  yield fork(watchFetchDataInCoursePage);
  yield fork(watchFetchDataInTopicPage);
  yield fork(watchFetchDataInCategoryPage);
  yield fork(watchFetchDataInAssignmentPage);
  yield fork(watchSubmitAssignment);
}

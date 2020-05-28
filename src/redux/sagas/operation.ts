import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import {
  OPERATION_FETCH_DATA_IN_LESSON_PAGE,
  OPERATION_FETCH_DATA_IN_COURSE_PAGE,
  OPERATION_FETCH_DATA_IN_TOPIC_PAGE,
  OPERATION_FETCH_DATA_IN_UTILITY_PAGE,
  OPERATION_FETCH_DATA_IN_CATEGORY_PAGE,
  OPERATION_FETCH_DATA_IN_ASSIGNMENT_PAGE,
  OPERATION_SUBMIT_ASSIGNMENT,
  OPERATION_PURCHASE_COURSE,
  OPERATION_FETCH_DATA_IN_TOEIC_PAGE,
} from '../actions/types';

import {
  setSmallTopic,
  setLargeTopic,
  fetchTopicByCourseId,
  fetchTopicByTopicId,
  fetchSmallTopicOnProgress,
  fetchSmallTopicSuccess,
  fetchLargeTopicOnProgress,
  fetchLargeTopicSuccess,
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
  updateCourse,
  fetchAllCourse,
  fetchCourseByUserId,
  fetchCourseByCategoryId,
} from '../actions/course';
import { fetchScale } from '../actions/scale';
import { fetchToeicByUserId } from '../actions/toeic';
import { fetchUserInfo } from '../actions/auth';
import { fetchAllCategory, setCurrentCategory } from '../actions/category';

import { getLessonByLessonId } from './lesson';
import { getTopicByTopicId } from './topic';
import { getCourseByCourseId } from './course';
import { getAssignmentByAssignmentId } from './assignment';
import { getParticipantSubmitAssignment } from './participant';
import { createOrUpdateProgressChain } from './progress';
import { updateCourseIds } from './auth';

export function* fetchDataInCategoryPage(action: any) {
  try {
    yield put(fetchAllCategory());
    if (action.params.id === 'all') {
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

export function* fetchDataInUtilityPage(action: any) {
  try {
    yield put(fetchLargeTopicOnProgress());
    const response = yield call(getCourseByCourseId, action.courseId);
    yield put(setLargeTopic(response.data));
    yield put(fetchLargeTopicSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* fetchDataInToeicPage() {
  try {
    yield put(fetchToeicByUserId());
    yield put(fetchScale());
  } catch (err) {
    console.log(err);
  }
}

export function* submitAssignment(action: any) {
  try {
    const userInfo = yield select((state) => state.authState);

    const payload = {
      userId: userInfo._id,
      assignmentId: action.assignment._id || action.assignmentState._id,
      userAnswer: action.userAnswer,
      score: action.score,
    };
    yield call(getParticipantSubmitAssignment, payload);

    if (action.percentComplete > 0) {
      const progressPayload = {
        userId: userInfo._id,
        percentComplete: action.percentComplete,
        lessonId: action.assignment.lessonId || null,
        assignmentId: action.assignment._id || action.assignmentState._id,
        topicId: action.assignmentState.topicId,
        courseId: action.assignmentState.courseId,
      };
      console.log(progressPayload);
      yield createOrUpdateProgressChain(progressPayload);
    }

    if (action.assignment.lessonId) {
      const lesson = yield call(
        getLessonByLessonId,
        action.assignment.lessonId
      );
      console.log(lesson.data);
      yield put(setLesson(lesson.data));
    }

    const assignment = yield call(
      getAssignmentByAssignmentId,
      action.assignment._id
    );

    yield put(setAssignment(assignment.data));
    action.onSuccess();
  } catch (err) {
    console.log(err);
  }
}

export function* purchaseCourse(action: any) {
  try {
    yield call(updateCourseIds, action.courseId);
    yield put(updateCourse(action.courseId));
    yield put(fetchUserInfo());
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

export function* watchFetchDataInUtilityPage() {
  yield takeLatest(
    OPERATION_FETCH_DATA_IN_UTILITY_PAGE,
    fetchDataInUtilityPage
  );
}

export function* watchFetchDataInToeicPage() {
  yield takeLatest(OPERATION_FETCH_DATA_IN_TOEIC_PAGE, fetchDataInToeicPage);
}

export function* watchSubmitAssignment() {
  yield takeLatest(OPERATION_SUBMIT_ASSIGNMENT, submitAssignment);
}

export function* watchPurchaseCourse() {
  yield takeLatest(OPERATION_PURCHASE_COURSE, purchaseCourse);
}

export default function* operation() {
  yield fork(watchFetchDataInLessonPage);
  yield fork(watchFetchDataInCoursePage);
  yield fork(watchFetchDataInTopicPage);
  yield fork(watchFetchDataInCategoryPage);
  yield fork(watchFetchDataInAssignmentPage);
  yield fork(watchFetchDataInUtilityPage);
  yield fork(watchFetchDataInToeicPage);
  yield fork(watchSubmitAssignment);
  yield fork(watchPurchaseCourse);
}

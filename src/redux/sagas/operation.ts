import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import { handleRedirectWhenServerError } from '../../utils';
import Routes from '../../routes';
import {
  OPERATION_FETCH_DATA_IN_LESSON_PAGE,
  OPERATION_FETCH_DATA_IN_COURSE_PAGE,
  OPERATION_FETCH_DATA_IN_TOPIC_PAGE,
  OPERATION_FETCH_DATA_IN_UTILITY_PAGE,
  OPERATION_FETCH_DATA_IN_CATEGORY_PAGE,
  OPERATION_FETCH_DATA_IN_ASSIGNMENT_PAGE,
  OPERATION_FETCH_DATA_IN_TOEIC_PAGE,
  OPERATION_FETCH_DATA_IN_TEST_PAGE,
  OPERATION_FETCH_DATA_IN_TEST_RESULT_PAGE,
  OPERATION_FETCH_DATA_IN_HOME_PAGE,
  OPERATION_SUBMIT_ASSIGNMENT,
  OPERATION_SUBMIT_TEST,
  OPERATION_PURCHASE_COURSE,
} from '../actions/types';

import {
  setSmallTopic,
  setLargeTopic,
  fetchTopicByCourseId,
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
import {
  fetchTest,
  setTest,
  fetchTestOnProgress,
  fetchTestSuccess,
} from '../actions/test';
import { fetchScale } from '../actions/scale';
import { fetchToeicByUserId } from '../actions/toeic';
import { fetchUserInfo } from '../actions/auth';
import { fetchSet } from '../actions/set';
import { fetchAllCategory, setCurrentCategory } from '../actions/category';

import { getLessonByLessonId } from './lesson';
import { getTopicByTopicId, getTopicByCourseId } from './topic';
import { getCourseByCourseId } from './course';
import { getAssignmentByAssignmentId } from './assignment';
import { getParticipantSubmitAssignment } from './participant';
import { createOrUpdateProgressChain } from './progress';
import {
  postTest,
  postFirstTimeTest,
  postTestByType,
  getLeaderBoard,
  getTestResult,
} from './test';
import { getLeaderboard as getTotalLeaderboard } from './toeic';
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
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
  }
}

export function* fetchDataInCoursePage(action: any) {
  try {
    yield put(fetchTopicByCourseId(action.courseId));
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
  }
}

export function* fetchDataInTopicPage(action: any) {
  try {
    // We cant use directly fetchTopicByTopicId because by that way we cant take the real data
    // Lấy dữ liệu về smallTopic sau đó fetch dữ liệu các part bên phải
    yield put(fetchSmallTopicOnProgress());
    yield put(fetchLargeTopicOnProgress());

    const smallTopic = yield call(getTopicByTopicId, action.topicId);
    yield put(setSmallTopic(smallTopic.data));
    const largeTopic = yield call(getTopicByCourseId, smallTopic.data.courseId);
    yield put(setLargeTopic(largeTopic.data));

    yield put(fetchLargeTopicSuccess());
    yield put(fetchSmallTopicSuccess());
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
  }
}

export function* fetchDataInLessonPage(action: any) {
  try {
    yield put(fetchLessonOnProgress());
    yield put(fetchLargeTopicOnProgress());
    yield put(fetchSmallTopicOnProgress());

    const lesson = yield call(getLessonByLessonId, action.lessonId);
    yield put(setLesson(lesson.data));

    const smallTopic = yield call(getTopicByTopicId, lesson.data.topicId);
    yield put(setSmallTopic(smallTopic.data));

    const largeTopic = yield call(getTopicByCourseId, lesson.data.courseId);
    yield put(setLargeTopic(largeTopic.data));

    yield put(fetchSmallTopicSuccess());
    yield put(fetchLargeTopicSuccess());
    yield put(fetchLessonSuccess());
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
  }
}

export function* fetchDataInAssignmentPage(action: any) {
  try {
    yield put(fetchAssignmentOnProgress());
    yield put(fetchSmallTopicOnProgress());
    yield put(fetchLargeTopicOnProgress());

    const assignment = yield call(
      getAssignmentByAssignmentId,
      action.assignmentId
    );
    yield put(setAssignment(assignment.data));

    const smallTopic = yield call(getTopicByTopicId, assignment.data.topicId);
    yield put(setSmallTopic(smallTopic.data));

    const largetTopic = yield call(
      getTopicByCourseId,
      assignment.data.courseId
    );
    yield put(setLargeTopic(largetTopic.data));

    yield put(fetchAssignmentSuccess());
    yield put(fetchSmallTopicSuccess());
    yield put(fetchLargeTopicSuccess());
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
  }
}

export function* fetchDataInUtilityPage(action: any) {
  try {
    yield put(fetchLargeTopicOnProgress());
    const response = yield call(getCourseByCourseId, action.courseId);
    yield put(setLargeTopic(response.data));
    yield put(fetchLargeTopicSuccess());
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
  }
}

export function* fetchDataInToeicPage(action: any) {
  try {
    yield put(fetchToeicByUserId());
    yield put(fetchScale());
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
  }
}

export function* fetchDataInTestPage(action: any) {
  try {
    yield put(fetchTest(action.testType));
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
  }
}

export function* fetchDataInTestResultPage(action: any) {
  try {
    yield put(fetchTestOnProgress());
    const response = yield call(getTestResult, action.participantId);
    yield put(setTest(response.data));
    yield put(fetchTestSuccess());
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
  }
}

export function* fetchDataInHomePage(action: any) {
  try {
    const toeicId = yield select((state) => state.authState.toeicId);
    if (toeicId) {
      yield put(fetchUserInfo());
      yield put(fetchSet(action.onError));
      yield put(fetchToeicByUserId());
    } else {
      yield put(fetchUserInfo());
      yield put(fetchSet(action.onError));
    }
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
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
        topicId: action.assignmentState.topicId
          ? action.assignmentState.topicId
          : action.assignment.topicId,
        courseId: action.assignmentState.courseId
          ? action.assignmentState.courseId
          : action.assignment.courseId,
      };
      console.log(progressPayload);
      yield createOrUpdateProgressChain(progressPayload);
    }

    if (action.assignment.lessonId) {
      const lesson = yield call(
        getLessonByLessonId,
        action.assignment.lessonId
      );
      yield put(setLesson(lesson.data));
    }

    const assignment = yield call(
      getAssignmentByAssignmentId,
      action.assignment._id
    );

    yield put(setAssignment(assignment.data));
    const response = yield call(
      getCourseByCourseId,
      action.assignmentState.courseId
        ? action.assignmentState.courseId
        : action.assignment.courseId
    );
    yield put(setLargeTopic(response.data));
    action.onSuccess();
  } catch (err) {
    action.onError(err.response);
    // handleRedirectWhenServerError(err, Routes);
  }
}

export function* submitTest(action: any) {
  try {
    const toeicId = yield select((state) => state.authState.toeicId);
    const payload = {
      testType: toeicId ? action.testType : undefined,
      assignment: action.assignment,
      score: action.score,
      percentComplete: action.percentComplete,
      userAnswer: action.userAnswer,
      numberOfQuestionIds: action.numberOfQuestionIds,
    };
    if (toeicId) yield call(postTest, payload);
    else {
      yield call(postFirstTimeTest, payload);
      yield put(fetchUserInfo());
      yield put(fetchSet(action.onError));
      yield put(fetchToeicByUserId());
    }
    // Lấy dữ liệu bài test mới
    const response = yield call(postTestByType, action.testType);
    // Fetch lại dữ liệu
    const oldQuestionIds = yield select(
      (state) => state.testState.data.questionIds
    );
    let testStateData = {};
    if (!isNaN(Number(action.testType))) {
      const leaderboard = yield call(getLeaderBoard, Number(action.testType));
      testStateData = {
        ...testStateData,
        name: `Part ${Number(action.testType)}`,
        questionIds: oldQuestionIds,
        participantIds: response.data.participantIds,
        leaderboard: leaderboard.data,
        duration: 600,
      };
    } else if (action.testType === 'short-test') {
      const leaderboard = yield call(getTotalLeaderboard);
      testStateData = {
        ...testStateData,
        name: `Bài thi rút gọn`,
        questionIds: oldQuestionIds,
        participantIds: response.data.participantIds,
        leaderboard: leaderboard.data,
        duration: 1200,
      };
    } else if (action.testType === 'full-test') {
      const leaderboard = yield call(getTotalLeaderboard);
      testStateData = {
        ...testStateData,
        name: `Bài thi hoàn chỉnh`,
        questionIds: oldQuestionIds,
        participantIds: response.data.participantIds,
        leaderboard: leaderboard.data,
        duration: 3600,
      };
    }
    yield put(setTest(testStateData));
    action.onSuccess();
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
  }
}

export function* purchaseCourse(action: any) {
  try {
    yield call(updateCourseIds, action.courseId);
    yield put(updateCourse(action.courseId));
    yield put(fetchUserInfo());
    action.onSuccess();
  } catch (err) {
    action.onError(err.response);
    handleRedirectWhenServerError(err, Routes);
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

export function* watchFetchDataInTestPage() {
  yield takeLatest(OPERATION_FETCH_DATA_IN_TEST_PAGE, fetchDataInTestPage);
}

export function* watchFetchDataInTestResultPage() {
  yield takeLatest(
    OPERATION_FETCH_DATA_IN_TEST_RESULT_PAGE,
    fetchDataInTestResultPage
  );
}

export function* watchFetchDataInHomePage() {
  yield takeLatest(OPERATION_FETCH_DATA_IN_HOME_PAGE, fetchDataInHomePage);
}

export function* watchSubmitAssignment() {
  yield takeLatest(OPERATION_SUBMIT_ASSIGNMENT, submitAssignment);
}

export function* watchSubmitTest() {
  yield takeLatest(OPERATION_SUBMIT_TEST, submitTest);
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
  yield fork(watchFetchDataInTestPage);
  yield fork(watchFetchDataInTestResultPage);
  yield fork(watchFetchDataInHomePage);
  yield fork(watchSubmitAssignment);
  yield fork(watchSubmitTest);
  yield fork(watchPurchaseCourse);
}

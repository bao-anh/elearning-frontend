import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import {
  fetchSmallTopicByParentId,
  fetchSmallTopicOnProgress,
  setLargeCurrentTopic,
} from '../actions/topic';
import {
  setCurrentLesson,
  fetchLessonOnProgress,
  fetchLessonSuccess,
} from '../actions/lesson';
import {
  setAssignment,
  fetchAssignmentOnProgress,
  fetchAssignmentSuccess,
} from '../actions/assignment';
import {
  fetchReferenceByParentId,
  fetchReferenceOnProgress,
} from '../actions/reference';
import { setCurrentCourse } from '../actions/course';
import { getCourseByCourseId } from './course';
import { getTopicByTopicId, getTopicByParentId } from './topic';
import { OPERATION_FETCH_DATA_IN_LESSON_PAGE } from '../actions/types';

export function* fetchDataInLessonPage(action: any) {
  try {
    yield put(fetchLessonOnProgress());
    yield put(fetchSmallTopicOnProgress());
    yield put(fetchAssignmentOnProgress());
    yield put(fetchReferenceOnProgress());

    //fetch current lesson
    const response = yield call(getTopicByTopicId, action.topicId);
    yield put(setCurrentLesson(response));
    yield put(fetchLessonSuccess());

    // fetch assignment of current lesson
    const assignment = yield call(getTopicByParentId, action.topicId);
    yield put(setAssignment(assignment));
    yield put(fetchAssignmentSuccess());

    yield put(fetchReferenceByParentId(response.id));

    // fetch topic-part in the right hand side
    yield put(fetchSmallTopicByParentId(response.parentId));

    // fetch course to put in breadcrumb
    const course = yield call(getCourseByCourseId, response.courseId);
    yield put(setCurrentCourse(course));

    // fetch current small topic in breadcrumb
    const smallTopicId = yield select(
      (state) => state.lessonState.current.parentId
    );
    const currentLargeTopic = yield call(getTopicByTopicId, smallTopicId);
    yield put(setLargeCurrentTopic(currentLargeTopic));
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchDataInLessonPage() {
  yield takeLatest(OPERATION_FETCH_DATA_IN_LESSON_PAGE, fetchDataInLessonPage);
}

export default function* operation() {
  yield fork(watchFetchDataInLessonPage);
}

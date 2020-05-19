import {
  OPERATION_FETCH_DATA_IN_LESSON_PAGE,
  OPERATION_FETCH_DATA_IN_COURSE_PAGE,
  OPERATION_FETCH_DATA_IN_TOPIC_PAGE,
} from '../actions/types';

export interface OperationAction {
  type: string;
  topicId?: number;
  courseId?: number;
  credentials?: any;
}

export function fetchDataInLessonPage(topicId: any): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_LESSON_PAGE,
    topicId,
  };
}

export function fetchDataInCoursePage(courseId: any): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_COURSE_PAGE,
    courseId,
  };
}

export function fetchDataInTopicPage(topicId: any): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_TOPIC_PAGE,
    topicId,
  };
}

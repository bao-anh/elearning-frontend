import {
  OPERATION_FETCH_DATA_IN_LESSON_PAGE,
  OPERATION_FETCH_DATA_IN_COURSE_PAGE,
  OPERATION_FETCH_DATA_IN_TOPIC_PAGE,
  OPERATION_FETCH_DATA_IN_CATEGORY_PAGE,
} from '../actions/types';

export interface OperationAction {
  type: string;
  topicId?: number;
  courseId?: number;
  lessonId?: any;
  credentials?: any;
  params?: any;
  userId?: number;
}

export function fetchDataInCategoryPage(
  params: any,
  userId: any
): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_CATEGORY_PAGE,
    params,
    userId,
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

export function fetchDataInLessonPage(lessonId: any): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_LESSON_PAGE,
    lessonId,
  };
}

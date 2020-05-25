import {
  OPERATION_FETCH_DATA_IN_LESSON_PAGE,
  OPERATION_FETCH_DATA_IN_COURSE_PAGE,
  OPERATION_FETCH_DATA_IN_TOPIC_PAGE,
  OPERATION_FETCH_DATA_IN_CATEGORY_PAGE,
  OPERATION_FETCH_DATA_IN_ASSIGNMENT_PAGE,
  OPERATION_FETCH_DATA_IN_UTILITY_PAGE,
  OPERATION_SUBMIT_ASSIGNMENT,
  OPERATION_PURCHASE_COURSE,
} from '../actions/types';

export interface OperationAction {
  type: string;
  topicId?: number;
  courseId?: number;
  lessonId?: any;
  credentials?: any;
  params?: any;
  userId?: number;
  assignmentId?: number;
  userAnswer?: any;
  score?: any;
  onSuccess?: any;
  assignment?: any;
  percentComplete?: any;
  assignmentState?: any;
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

export function fetchDataInAssignmentPage(assignmentId: any): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_ASSIGNMENT_PAGE,
    assignmentId,
  };
}

export function fetchDataInUtilityPage(courseId: any): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_UTILITY_PAGE,
    courseId,
  };
}

export function submitAssignment(
  assignmentState: any,
  assignment: any,
  percentComplete: any,
  userAnswer: any,
  score: any,
  onSuccess: any
) {
  return {
    type: OPERATION_SUBMIT_ASSIGNMENT,
    assignmentState,
    assignment,
    percentComplete,
    userAnswer,
    score,
    onSuccess,
  };
}

export function purchaseCourse(courseId: any, onSuccess: any) {
  return {
    type: OPERATION_PURCHASE_COURSE,
    courseId,
    onSuccess,
  };
}

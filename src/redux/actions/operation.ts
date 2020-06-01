import {
  OPERATION_FETCH_DATA_IN_LESSON_PAGE,
  OPERATION_FETCH_DATA_IN_COURSE_PAGE,
  OPERATION_FETCH_DATA_IN_TOPIC_PAGE,
  OPERATION_FETCH_DATA_IN_CATEGORY_PAGE,
  OPERATION_FETCH_DATA_IN_ASSIGNMENT_PAGE,
  OPERATION_FETCH_DATA_IN_UTILITY_PAGE,
  OPERATION_FETCH_DATA_IN_TOEIC_PAGE,
  OPERATION_FETCH_DATA_IN_TEST_PAGE,
  OPERATION_FETCH_DATA_IN_TEST_RESULT_PAGE,
  OPERATION_SUBMIT_ASSIGNMENT,
  OPERATION_SUBMIT_TEST,
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
  testType?: any;
  numberOfQuestionIds?: any;
  participantId?: any;
  onError?: any;
}

export function fetchDataInCategoryPage(
  params: any,
  userId: any,
  onError: any
): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_CATEGORY_PAGE,
    params,
    userId,
    onError,
  };
}

export function fetchDataInCoursePage(
  courseId: any,
  onError: any
): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_COURSE_PAGE,
    courseId,
    onError,
  };
}

export function fetchDataInTopicPage(
  topicId: any,
  onError: any
): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_TOPIC_PAGE,
    topicId,
    onError,
  };
}

export function fetchDataInLessonPage(
  lessonId: any,
  onError: any
): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_LESSON_PAGE,
    lessonId,
    onError,
  };
}

export function fetchDataInAssignmentPage(
  assignmentId: any,
  onError: any
): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_ASSIGNMENT_PAGE,
    assignmentId,
    onError,
  };
}

export function fetchDataInUtilityPage(
  courseId: any,
  onError: any
): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_UTILITY_PAGE,
    courseId,
    onError,
  };
}

export function fetchDataInToeicPage(onError: any): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_TOEIC_PAGE,
    onError,
  };
}

export function fetchDataInTestPage(
  testType: any,
  onError: any
): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_TEST_PAGE,
    testType,
    onError,
  };
}

export function fetchDataInTestResultPage(
  participantId: any,
  onError: any
): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_TEST_RESULT_PAGE,
    participantId,
    onError,
  };
}

export function submitAssignment(
  assignmentState: any,
  assignment: any,
  percentComplete: any,
  userAnswer: any,
  score: any,
  onSuccess: any,
  onError: any
) {
  return {
    type: OPERATION_SUBMIT_ASSIGNMENT,
    assignmentState,
    assignment,
    percentComplete,
    userAnswer,
    score,
    onSuccess,
    onError,
  };
}

export function submitTest(
  assignment: any,
  percentComplete: any,
  userAnswer: any,
  testType: any,
  score: any,
  onSuccess: any,
  numberOfQuestionIds?: any
) {
  return {
    type: OPERATION_SUBMIT_TEST,
    assignment,
    percentComplete,
    userAnswer,
    testType,
    score,
    onSuccess,
    numberOfQuestionIds,
  };
}

export function purchaseCourse(courseId: any, onSuccess: any, onError: any) {
  return {
    type: OPERATION_PURCHASE_COURSE,
    courseId,
    onSuccess,
    onError,
  };
}

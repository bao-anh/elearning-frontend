import { OPERATION_FETCH_DATA_IN_LESSON_PAGE } from '../actions/types';

export interface OperationAction {
  type: string;
  topicId?: number;
}

export function fetchDataInLessonPage(topicId: any): OperationAction {
  return {
    type: OPERATION_FETCH_DATA_IN_LESSON_PAGE,
    topicId,
  };
}

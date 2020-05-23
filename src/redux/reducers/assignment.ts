import { Reducer } from 'redux';
import Topic from '../../models/Topic';
import { LessonAction } from '../actions/lesson';
import {
  ASSIGNMENT_SET_DATA,
  ASSIGNMENT_SET_PARTICIPANT_DATA,
  ASSIGNMENT_FETCH_ON_PROGRESS,
  ASSIGNMENT_FETCH_SUCCESS,
} from '../actions/types';

export interface AssignmentState {
  isLoading: boolean;
  data: Array<Topic>;
  error: string;
}

const initState = {
  isLoading: true,
  data: [],
  error: '',
};

const assignmentState: Reducer<AssignmentState> = (
  state: AssignmentState = initState,
  action: LessonAction | any
): AssignmentState => {
  switch (action.type) {
    case ASSIGNMENT_SET_DATA: {
      return {
        ...state,
        data: action.assignment,
      };
    }
    case ASSIGNMENT_SET_PARTICIPANT_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }
    case ASSIGNMENT_FETCH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ASSIGNMENT_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default assignmentState;

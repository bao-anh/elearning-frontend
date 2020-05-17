import Topic from '../../models/Topic';
import {
  ASSIGNMENT_SET_DATA,
  ASSIGNMENT_FETCH_SUCCESS,
  ASSIGNMENT_FETCH_ON_PROGRESS,
} from '../actions/types';

export interface AssignmentAction {
  type: string;
  assignment?: Array<Topic>;
}

export function setAssignment(assignment: any): AssignmentAction {
  return {
    type: ASSIGNMENT_SET_DATA,
    assignment,
  };
}

export function fetchAssignmentSuccess(): AssignmentAction {
  return {
    type: ASSIGNMENT_FETCH_SUCCESS,
  };
}

export function fetchAssignmentOnProgress(): AssignmentAction {
  return {
    type: ASSIGNMENT_FETCH_ON_PROGRESS,
  };
}

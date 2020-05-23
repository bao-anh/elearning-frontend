import Topic from '../../models/Topic';
import {
  ASSIGNMENT_FETCH_BY_ASSIGNMENT_ID,
  ASSIGNMENT_SET_DATA,
  ASSIGNMENT_SET_PARTICIPANT_DATA,
  ASSIGNMENT_FETCH_SUCCESS,
  ASSIGNMENT_FETCH_ON_PROGRESS,
} from '../actions/types';

export interface AssignmentAction {
  type: string;
  assignment?: Array<Topic>;
  assignmentId?: number;
  data?: any;
}

export function fetchAssignmentByAssignmentId(
  assignmentId: any
): AssignmentAction {
  return {
    type: ASSIGNMENT_FETCH_BY_ASSIGNMENT_ID,
    assignmentId,
  };
}

export function setAssignment(assignment: any): AssignmentAction {
  return {
    type: ASSIGNMENT_SET_DATA,
    assignment,
  };
}

export function setParticipantData(data: any): AssignmentAction {
  return {
    type: ASSIGNMENT_SET_PARTICIPANT_DATA,
    data,
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

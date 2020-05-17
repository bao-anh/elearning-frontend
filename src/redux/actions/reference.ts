import Reference from '../../models/Reference';
import {
  REFERENCE_FETCH_BY_COURSE_ID,
  REFERENCE_FETCH_BY_PARENT_ID,
  REFERENCE_SET_DATA,
  REFERENCE_FETCH_ON_PROGRESS,
  REFERENCE_FETCH_SUCCESS,
} from '../actions/types';

export interface ReferenceAction {
  type: string;
  courseId?: number;
  parentId?: number;
  reference?: Array<Reference>;
}

export function fetchReferenceByCourseId(courseId: any): ReferenceAction {
  return {
    type: REFERENCE_FETCH_BY_COURSE_ID,
    courseId,
  };
}

export function fetchReferenceByParentId(parentId: any): ReferenceAction {
  return {
    type: REFERENCE_FETCH_BY_PARENT_ID,
    parentId,
  };
}
export function setReference(reference: any): ReferenceAction {
  return {
    type: REFERENCE_SET_DATA,
    reference,
  };
}
export function fetchReferenceOnProgress(): ReferenceAction {
  return {
    type: REFERENCE_FETCH_ON_PROGRESS,
  };
}
export function fetchReferenceSuccess(): ReferenceAction {
  return {
    type: REFERENCE_FETCH_SUCCESS,
  };
}

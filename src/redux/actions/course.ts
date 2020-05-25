import Course from '../../models/Course';
import {
  COURSE_FETCH_ALL,
  COURSE_FETCH_BY_CATEGORY_ID,
  COURSE_FETCH_BY_USER_ID,
  COURSE_SET_DATA,
  COURSE_SET_CURRENT_DATA,
  COURSE_FETCH_SUCCESS,
  COURSE_FETCH_ON_PROGRESS,
  COURSE_UPDATE_DATA,
} from '../actions/types';

export interface CourseAction {
  type: string;
  categoryId?: number;
  courseId?: number;
  course?: Array<Course>;
  currentCourse?: Course;
  userId?: number;
  payload?: any;
}

export function fetchAllCourse(): CourseAction {
  return {
    type: COURSE_FETCH_ALL,
  };
}

export function fetchCourseByCategoryId(categoryId: number): CourseAction {
  return {
    type: COURSE_FETCH_BY_CATEGORY_ID,
    categoryId,
  };
}

export function fetchCourseByUserId(userId: number): CourseAction {
  return {
    type: COURSE_FETCH_BY_USER_ID,
    userId,
  };
}

export function setCourse(course: any): CourseAction {
  return {
    type: COURSE_SET_DATA,
    course,
  };
}

export function setCurrentCourse(currentCourse: any): CourseAction {
  return {
    type: COURSE_SET_CURRENT_DATA,
    currentCourse,
  };
}

export function updateCourse(courseId: any): CourseAction {
  return {
    type: COURSE_UPDATE_DATA,
    courseId,
  };
}

export function fetchCourseSuccess(): CourseAction {
  return {
    type: COURSE_FETCH_SUCCESS,
  };
}

export function fetchCourseOnProgress(): CourseAction {
  return {
    type: COURSE_FETCH_ON_PROGRESS,
  };
}

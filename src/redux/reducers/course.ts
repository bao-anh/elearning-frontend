import { Reducer } from 'redux';
import Course from '../../models/Course';
import { CourseAction } from '../actions/course';
import {
  COURSE_SET_DATA,
  COURSE_SET_CURRENT_DATA,
  COURSE_FETCH_SUCCESS,
  COURSE_FETCH_ON_PROGRESS,
} from '../actions/types';

export interface CourseState {
  isLoading: boolean;
  data: Array<Course>;
  error: string;
  current?: Course;
}

const initState = {
  isLoading: true,
  data: [],
  error: '',
};

const courseState: Reducer<CourseState> = (
  state: CourseState = initState,
  action: CourseAction | any
): CourseState => {
  switch (action.type) {
    case COURSE_SET_DATA: {
      return {
        ...state,
        data: action.course,
      };
    }
    case COURSE_SET_CURRENT_DATA: {
      return {
        ...state,
        current: action.currentCourse,
      };
    }
    case COURSE_FETCH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case COURSE_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default courseState;

import Topic from '../../models/Topic';
import {
  LESSON_SET_DATA,
  LESSON_FETCH_SUCCESS,
  LESSON_FETCH_ON_PROGRESS,
  LESSON_SET_CURRENT,
} from '../actions/types';

export interface LessonAction {
  type: string;
  lesson?: Array<Topic>;
  currentLesson?: Topic;
}

export function setLesson(lesson: any): LessonAction {
  return {
    type: LESSON_SET_DATA,
    lesson,
  };
}

export function setCurrentLesson(currentLesson: any): LessonAction {
  return {
    type: LESSON_SET_CURRENT,
    currentLesson,
  };
}

export function fetchLessonSuccess(): LessonAction {
  return {
    type: LESSON_FETCH_SUCCESS,
  };
}

export function fetchLessonOnProgress(): LessonAction {
  return {
    type: LESSON_FETCH_ON_PROGRESS,
  };
}

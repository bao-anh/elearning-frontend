import Topic from '../../models/Topic';
import {
  LESSON_FETCH_BY_LESSON_ID,
  LESSON_SET_DATA,
  LESSON_FETCH_SUCCESS,
  LESSON_FETCH_ON_PROGRESS,
} from '../actions/types';

export interface LessonAction {
  type: string;
  lesson?: Array<Topic>;
  lessonId?: number;
  currentLesson?: Topic;
}

export function fetchLessonByLessonId(lessonId: any): LessonAction {
  return {
    type: LESSON_FETCH_BY_LESSON_ID,
    lessonId,
  };
}

export function setLesson(lesson: any): LessonAction {
  return {
    type: LESSON_SET_DATA,
    lesson,
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

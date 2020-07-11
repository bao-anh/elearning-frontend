import { Reducer } from 'redux';
import Topic from '../../models/Topic';
import { LessonAction } from '../actions/lesson';
import { likeComment } from '../../utils';
import {
  LESSON_SET_DATA,
  LESSON_FETCH_ON_PROGRESS,
  LESSON_FETCH_SUCCESS,
  LESSON_LIKE_COMMENT,
  LESSON_SET_COMMENT,
} from '../actions/types';

export interface LessonState {
  isLoading: boolean;
  data: Array<Topic>;
  error: string;
  current?: Topic;
}

const initState = {
  isLoading: true,
  data: [],
  error: '',
};

const lessonState: Reducer<LessonState> = (
  state: LessonState = initState,
  action: LessonAction | any
): LessonState => {
  switch (action.type) {
    case LESSON_SET_DATA: {
      return {
        ...state,
        data: action.lesson,
      };
    }
    case LESSON_SET_COMMENT: {
      return {
        ...state,
        data: {
          ...state.data,
          //@ts-ignore
          commentIds: action.data.commentIds,
        },
      };
    }
    case LESSON_LIKE_COMMENT: {
      return likeComment(state, action, 'data');
    }
    case LESSON_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LESSON_FETCH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
};

export default lessonState;

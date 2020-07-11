import { Reducer } from 'redux';
import Topic from '../../models/Topic';
import { TopicAction } from '../actions/topic';
import { likeComment } from '../../utils';
import {
  TOPIC_SET_LARGE_DATA,
  TOPIC_SET_LARGE_COMMENT,
  TOPIC_SET_SMALL_COMMENT,
  TOPIC_SET_SMALL_DATA,
  TOPIC_FETCH_LARGE_ON_PROGRESS,
  TOPIC_FETCH_LARGE_SUCCESS,
  TOPIC_FETCH_SMALL_ON_PROGRESS,
  TOPIC_FETCH_SMALL_SUCCESS,
  TOPIC_LARGE_LIKE_COMMENT,
  TOPIC_SMALL_LIKE_COMMENT,
} from '../actions/types';

export interface TopicState {
  isLoadingLargeTopic: boolean;
  isLoadingSmallTopic: boolean;
  largeTopic: Array<Topic>;
  smallTopic: Array<Topic>;
  error: string;
}

const initState = {
  isLoadingLargeTopic: true,
  isLoadingSmallTopic: true,
  largeTopic: [],
  smallTopic: [],
  error: '',
};

const topicState: Reducer<TopicState> = (
  state: TopicState = initState,
  action: TopicAction | any
): TopicState => {
  switch (action.type) {
    case TOPIC_SET_LARGE_DATA: {
      return {
        ...state,
        largeTopic: action.largeTopic,
      };
    }

    case TOPIC_SET_LARGE_COMMENT: {
      return {
        ...state,
        largeTopic: {
          ...state.largeTopic,
          //@ts-ignore
          commentIds: action.data.commentIds,
        },
      };
    }

    case TOPIC_SET_SMALL_COMMENT: {
      return {
        ...state,
        smallTopic: {
          ...state.smallTopic,
          //@ts-ignore
          commentIds: action.data.commentIds,
        },
      };
    }

    case TOPIC_LARGE_LIKE_COMMENT: {
      return likeComment(state, action, 'largeTopic');
    }

    case TOPIC_SMALL_LIKE_COMMENT: {
      return likeComment(state, action, 'smallTopic');
    }

    case TOPIC_SET_SMALL_DATA: {
      return {
        ...state,
        smallTopic: action.smallTopic,
      };
    }
    case TOPIC_FETCH_LARGE_ON_PROGRESS: {
      return {
        ...state,
        isLoadingLargeTopic: true,
      };
    }
    case TOPIC_FETCH_LARGE_SUCCESS: {
      return {
        ...state,
        isLoadingLargeTopic: false,
      };
    }
    case TOPIC_FETCH_SMALL_ON_PROGRESS: {
      return {
        ...state,
        isLoadingSmallTopic: true,
      };
    }
    case TOPIC_FETCH_SMALL_SUCCESS: {
      return {
        ...state,
        isLoadingSmallTopic: false,
      };
    }
    default:
      return state;
  }
};

export default topicState;

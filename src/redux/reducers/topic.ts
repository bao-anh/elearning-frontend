import { Reducer } from 'redux';
import Topic from '../../models/Topic';
import { TopicAction } from '../actions/topic';
import {
  TOPIC_SET_LARGE_DATA,
  TOPIC_SET_SMALL_DATA,
  TOPIC_SET_LARGE_CURRENT,
  TOPIC_SET_SMALL_CURRENT,
  TOPIC_FETCH_LARGE_SUCCESS,
  TOPIC_FETCH_LARGE_ON_PROGRESS,
  TOPIC_FETCH_SMALL_SUCCESS,
  TOPIC_FETCH_SMALL_ON_PROGRESS,
} from '../actions/types';

export interface TopicState {
  isLoadingLargeTopic: boolean;
  isLoadingSmallTopic: boolean;
  // là những topic nằm bên ngoài gần với course, các part
  largeTopic: Array<Topic>;
  // là những topic nằm trong 1 part nào đó
  smallTopic: Array<Topic>;
  currentLargeTopic?: Topic;
  currentSmallTopic?: Topic;
  error: string;
}

const initState = {
  isLoadingLargeTopic: true,
  isLoadingSmallTopic: false,
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
    case TOPIC_SET_LARGE_CURRENT: {
      return {
        ...state,
        currentLargeTopic: action.currentLargeTopic,
      };
    }
    case TOPIC_SET_SMALL_CURRENT: {
      return {
        ...state,
        currentSmallTopic: action.currentSmallTopic,
      };
    }
    default:
      return state;
  }
};

export default topicState;

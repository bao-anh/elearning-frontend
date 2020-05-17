import Topic from '../../models/Topic';
import {
  TOPIC_FETCH_LARGE_BY_PARENT_ID,
  TOPIC_FETCH_SMALL_BY_PARENT_ID,
  TOPIC_FETCH_LARGE_BY_TOPIC_ID,
  TOPIC_FETCH_SMALL_BY_TOPIC_ID,
  TOPIC_FETCH_LARGE_SUCCESS,
  TOPIC_FETCH_LARGE_ON_PROGRESS,
  TOPIC_FETCH_SMALL_SUCCESS,
  TOPIC_FETCH_SMALL_ON_PROGRESS,
  TOPIC_SET_LARGE_DATA,
  TOPIC_SET_SMALL_DATA,
  TOPIC_SET_LARGE_CURRENT,
  TOPIC_SET_SMALL_CURRENT,
} from '../actions/types';

export interface TopicAction {
  type: string;
  parentId?: number;
  topicId?: number;
  largeTopic?: Array<Topic>;
  smallTopic?: Array<Topic>;
  currentLargeTopic?: Topic;
  currentSmallTopic?: Topic;
}

export function fetchLargeTopicByParentId(parentId: number): TopicAction {
  return {
    type: TOPIC_FETCH_LARGE_BY_PARENT_ID,
    parentId,
  };
}

export function fetchSmallTopicByParentId(parentId: number): TopicAction {
  return {
    type: TOPIC_FETCH_SMALL_BY_PARENT_ID,
    parentId,
  };
}

export function fetchLargeTopicByTopicId(topicId: number): TopicAction {
  return {
    type: TOPIC_FETCH_LARGE_BY_TOPIC_ID,
    topicId,
  };
}

export function fetchSmallTopicByTopicId(topicId: number): TopicAction {
  return {
    type: TOPIC_FETCH_SMALL_BY_TOPIC_ID,
    topicId,
  };
}

export function fetchLargeTopicSuccess(): TopicAction {
  return {
    type: TOPIC_FETCH_LARGE_SUCCESS,
  };
}

export function fetchLargeTopicOnProgress(): TopicAction {
  return {
    type: TOPIC_FETCH_LARGE_ON_PROGRESS,
  };
}

export function fetchSmallTopicSuccess(): TopicAction {
  return {
    type: TOPIC_FETCH_SMALL_SUCCESS,
  };
}

export function fetchSmallTopicOnProgress(): TopicAction {
  return {
    type: TOPIC_FETCH_SMALL_ON_PROGRESS,
  };
}

export function setLargeTopic(largeTopic: any): TopicAction {
  return {
    type: TOPIC_SET_LARGE_DATA,
    largeTopic,
  };
}

export function setSmallTopic(smallTopic: any): TopicAction {
  return {
    type: TOPIC_SET_SMALL_DATA,
    smallTopic,
  };
}

export function setLargeCurrentTopic(currentLargeTopic: any): TopicAction {
  return {
    type: TOPIC_SET_LARGE_CURRENT,
    currentLargeTopic,
  };
}

export function setSmallCurrentTopic(currentSmallTopic: any): TopicAction {
  return {
    type: TOPIC_SET_SMALL_CURRENT,
    currentSmallTopic,
  };
}

import {
  TOPIC_FETCH_BY_COURSE_ID,
  TOPIC_FETCH_BY_TOPIC_ID,
  TOPIC_SET_LARGE_DATA,
  TOPIC_SET_SMALL_DATA,
  TOPIC_FETCH_LARGE_ON_PROGRESS,
  TOPIC_FETCH_LARGE_SUCCESS,
  TOPIC_FETCH_SMALL_ON_PROGRESS,
  TOPIC_FETCH_SMALL_SUCCESS,
} from '../actions/types';

export interface TopicAction {
  type: string;
  courseId?: any;
  topicId?: any;
  largeTopic?: any;
  smallTopic?: any;
}

export function fetchTopicByCourseId(courseId: number): TopicAction {
  return {
    type: TOPIC_FETCH_BY_COURSE_ID,
    courseId,
  };
}

export function fetchTopicByTopicId(topicId: number): TopicAction {
  return {
    type: TOPIC_FETCH_BY_TOPIC_ID,
    topicId,
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

export function fetchLargeTopicOnProgress(): TopicAction {
  return {
    type: TOPIC_FETCH_LARGE_ON_PROGRESS,
  };
}

export function fetchLargeTopicSuccess(): TopicAction {
  return {
    type: TOPIC_FETCH_LARGE_SUCCESS,
  };
}

export function fetchSmallTopicOnProgress(): TopicAction {
  return {
    type: TOPIC_FETCH_SMALL_ON_PROGRESS,
  };
}

export function fetchSmallTopicSuccess(): TopicAction {
  return {
    type: TOPIC_FETCH_SMALL_SUCCESS,
  };
}

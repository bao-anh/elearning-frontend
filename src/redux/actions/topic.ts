import {
  TOPIC_FETCH_BY_COURSE_ID,
  TOPIC_FETCH_BY_TOPIC_ID,
  TOPIC_SET_LARGE_DATA,
  TOPIC_SET_LARGE_COMMENT,
  TOPIC_SET_SMALL_COMMENT,
  TOPIC_LARGE_LIKE_COMMENT,
  TOPIC_SMALL_LIKE_COMMENT,
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
  userId?: number;
  item?: any;
  parent?: any;
  isLike?: any;
  data?: any;
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

export function setLargeTopicComment(data: any): TopicAction {
  return {
    type: TOPIC_SET_LARGE_COMMENT,
    data,
  };
}

export function setSmallTopicComment(data: any): TopicAction {
  return {
    type: TOPIC_SET_SMALL_COMMENT,
    data,
  };
}

export function likeLargeTopicComment(
  userId: any,
  item: any,
  parent: any,
  isLike: any
): TopicAction {
  return {
    type: TOPIC_LARGE_LIKE_COMMENT,
    userId,
    item,
    parent,
    isLike,
  };
}

export function likeSmallTopicComment(
  userId: any,
  item: any,
  parent: any,
  isLike: any
): TopicAction {
  return {
    type: TOPIC_SMALL_LIKE_COMMENT,
    userId,
    item,
    parent,
    isLike,
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

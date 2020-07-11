import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api } from '../../services';
import { handleRedirectWhenServerError } from '../../utils';
import { positionEnum } from '../../enum';
import Routes from '../../routes';
import {
  COMMENT_ADD,
  COMMENT_DELETE,
  COMMENT_UPDATE,
  COMMENT_LIKE,
} from '../actions/types';
import {
  setLargeTopicComment,
  setSmallTopicComment,
  likeLargeTopicComment,
  likeSmallTopicComment,
} from '../actions/topic';
import { setLessonComment, likeLessonComment } from '../actions/lesson';
import {
  setAssignmentComment,
  likeAssignmentComment,
} from '../actions/assignment';

export const postComment = (parentId: any, position: any, message: any) => {
  return api.post(`/comments/${parentId}`, { position, message });
};

export const deleteCommentAPI = (
  commentId: any,
  parentId: any,
  position: any
) => {
  return api.delete(
    `/comments/${commentId}?parentId=${parentId}&position=${position}`
  );
};

export const putComment = (commentId: any, message: any) => {
  return api.put(`/comments/${commentId}`, { message });
};

export const putLikeComment = (commentId: any, isLike: any) => {
  return api.put(`/comments/${commentId}/like`, { isLike });
};

export const getCourseComment = (courseId: any) => {
  return api.get(`/comments/courses/${courseId}`);
};

export const getTopicComment = (topicId: any) => {
  return api.get(`/comments/topics/${topicId}`);
};

export const getLessonComment = (lessonId: any) => {
  return api.get(`/comments/lessons/${lessonId}`);
};

export const getAssignmentComment = (assignmentId: any) => {
  return api.get(`/comments/assignments/${assignmentId}`);
};

export function* addComment(action: any) {
  try {
    let response = null;

    if (action.parentCommentId) {
      response = yield call(
        postComment,
        action.parentCommentId,
        'children',
        action.message
      );
    } else {
      response = yield call(
        postComment,
        action.parentId,
        positionEnum[action.position],
        action.message
      );
    }

    if (response) {
      if (positionEnum[action.position] === 'course') {
        const comment = yield call(getCourseComment, action.parentId);
        yield put(setLargeTopicComment(comment.data));
      } else if (positionEnum[action.position] === 'topic') {
        const comment = yield call(getTopicComment, action.parentId);
        yield put(setSmallTopicComment(comment.data));
      } else if (positionEnum[action.position] === 'lesson') {
        const comment = yield call(getLessonComment, action.parentId);
        yield put(setLessonComment(comment.data));
      } else if (positionEnum[action.position] === 'assignment') {
        const comment = yield call(getAssignmentComment, action.parentId);
        yield put(setAssignmentComment(comment.data));
      }
    }

    action.onSuccess();
  } catch (err) {
    handleRedirectWhenServerError(err, Routes);
    console.log(err.response);
  }
}

export function* deleteComment(action: any) {
  try {
    let response = null;

    if (action.parentCommentId) {
      response = yield call(
        deleteCommentAPI,
        action.commentId,
        action.parentCommentId,
        'children'
      );
    } else {
      response = yield call(
        deleteCommentAPI,
        action.commentId,
        action.parentId,
        positionEnum[action.position]
      );
    }

    if (response) {
      if (positionEnum[action.position] === 'course') {
        const comment = yield call(getCourseComment, action.parentId);
        yield put(setLargeTopicComment(comment.data));
      } else if (positionEnum[action.position] === 'topic') {
        const comment = yield call(getTopicComment, action.parentId);
        yield put(setSmallTopicComment(comment.data));
      } else if (positionEnum[action.position] === 'lesson') {
        const comment = yield call(getLessonComment, action.parentId);
        yield put(setLessonComment(comment.data));
      } else if (positionEnum[action.position] === 'assignment') {
        const comment = yield call(getAssignmentComment, action.parentId);
        yield put(setAssignmentComment(comment.data));
      }
    }

    action.onSuccess();
  } catch (err) {
    handleRedirectWhenServerError(err, Routes);
    console.log(err.response);
  }
}

export function* updateComment(action: any) {
  try {
    const response = yield call(putComment, action.commentId, action.message);
    if (response) {
      if (positionEnum[action.position] === 'course') {
        const comment = yield call(getCourseComment, action.parentId);
        yield put(setLargeTopicComment(comment.data));
      } else if (positionEnum[action.position] === 'topic') {
        const comment = yield call(getTopicComment, action.parentId);
        yield put(setSmallTopicComment(comment.data));
      } else if (positionEnum[action.position] === 'lesson') {
        const comment = yield call(getLessonComment, action.parentId);
        yield put(setLessonComment(comment.data));
      } else if (positionEnum[action.position] === 'assignment') {
        const comment = yield call(getAssignmentComment, action.parentId);
        yield put(setAssignmentComment(comment.data));
      }
    }
    action.onSuccess();
  } catch (err) {
    handleRedirectWhenServerError(err, Routes);
    console.log(err.response);
  }
}

export function* likeComment(action: any) {
  try {
    yield call(putLikeComment, action.item._id, action.isLike);

    if (positionEnum[action.position] === 'course') {
      yield put(
        likeLargeTopicComment(
          action.userId,
          action.item,
          action.parent,
          action.isLike
        )
      );
    } else if (positionEnum[action.position] === 'topic') {
      yield put(
        likeSmallTopicComment(
          action.userId,
          action.item,
          action.parent,
          action.isLike
        )
      );
    } else if (positionEnum[action.position] === 'lesson') {
      yield put(
        likeLessonComment(
          action.userId,
          action.item,
          action.parent,
          action.isLike
        )
      );
    } else if (positionEnum[action.position] === 'assignment') {
      yield put(
        likeAssignmentComment(
          action.userId,
          action.item,
          action.parent,
          action.isLike
        )
      );
    }
    action.onSuccess();
  } catch (err) {
    handleRedirectWhenServerError(err, Routes);
    console.log(err.response);
  }
}

export function* watchAddComment() {
  yield takeLatest(COMMENT_ADD, addComment);
}

export function* watchDeleteComment() {
  yield takeLatest(COMMENT_DELETE, deleteComment);
}

export function* watchUpdateComment() {
  yield takeLatest(COMMENT_UPDATE, updateComment);
}

export function* watchLikeComment() {
  yield takeLatest(COMMENT_LIKE, likeComment);
}

export default function* comment() {
  yield fork(watchAddComment);
  yield fork(watchDeleteComment);
  yield fork(watchUpdateComment);
  yield fork(watchLikeComment);
}

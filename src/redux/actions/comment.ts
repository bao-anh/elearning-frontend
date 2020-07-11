import {
  COMMENT_ADD,
  COMMENT_DELETE,
  COMMENT_UPDATE,
  COMMENT_LIKE,
} from '../actions/types';

export interface CommentAction {
  type: string;
  commentId?: any;
  parentId?: any;
  position?: any;
  parentCommentId?: any;
  message?: any;
  onSuccess?: any;
  userId?: any;
  item?: any;
  parent?: any;
  isLike?: any;
}

export function addComment(
  parentId: any,
  parentCommentId: any,
  position: any,
  message: any,
  onSuccess: any
): CommentAction {
  return {
    type: COMMENT_ADD,
    parentId,
    parentCommentId,
    position,
    message,
    onSuccess,
  };
}

export function deleteComment(
  commentId: any,
  parentId: any,
  parentCommentId: any,
  position: any,
  onSuccess: any
): CommentAction {
  return {
    type: COMMENT_DELETE,
    commentId,
    parentId,
    parentCommentId,
    position,
    onSuccess,
  };
}

export function updateComment(
  commentId: any,
  parentId: any,
  position: any,
  message: any,
  onSuccess: any
): CommentAction {
  return {
    type: COMMENT_UPDATE,
    commentId,
    parentId,
    position,
    message,
    onSuccess,
  };
}

export function likeComment(
  userId: any,
  item: any,
  parent: any,
  isLike: any,
  position: any,
  onSuccess: any
): CommentAction {
  return {
    type: COMMENT_LIKE,
    userId,
    item,
    parent,
    isLike,
    position,
    onSuccess,
  };
}

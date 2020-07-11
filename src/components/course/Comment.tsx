import React, { FunctionComponent, useState } from 'react';
import Moment from 'react-moment';
import UserImage from '../../resources/images/user.png';
import { NUMBER_OF_COMMENTS_PER_TIME } from '../../enum';
import { orderIndexOfComment } from '../../utils';
import '../../resources/scss/component/comment.scss';

import { Avatar, TextField, CircularProgress } from '@material-ui/core';
import {
  Telegram as SendIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ThumbUp as LikeIcon,
} from '@material-ui/icons';

const Comment: FunctionComponent<{
  addComment: any;
  deleteComment: any;
  updateComment: any;
  likeComment: any;
  authState: any;
  match: any;
  content: any;
}> = ({
  addComment,
  deleteComment,
  updateComment,
  likeComment,
  authState,
  match,
  content,
}) => {
  const [message, setMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(0);
  const [editCommentId, setEditCommentId] = useState(0);
  const [replyCommentId, setReplyCommentId] = useState(0);
  const [forcusCommentId, setForcusCommentId] = useState(0);
  const [page, setPage] = useState(1);

  const onEnter = (e: any, parentCommentId: any) => {
    if (e.keyCode === 13 && !isSubmit) {
      if ((parentCommentId && replyMessage !== '') || message !== '') {
        setIsSubmit(true);
        if (parentCommentId) {
          addComment(
            match.params.id,
            parentCommentId,
            match.path,
            replyMessage,
            onAddSuccess
          );
        } else
          addComment(
            match.params.id,
            parentCommentId,
            match.path,
            message,
            onAddSuccess
          );
      }
    }
  };

  const onClick = (parentCommentId: any) => {
    if (!isSubmit && message !== '') {
      if ((parentCommentId && replyMessage !== '') || message !== '') {
        setIsSubmit(true);
        if (parentCommentId) {
          addComment(
            match.params.id,
            parentCommentId,
            match.path,
            replyMessage,
            onAddSuccess
          );
        } else
          addComment(
            match.params.id,
            parentCommentId,
            match.path,
            message,
            onAddSuccess
          );
      }
    }
  };

  const onDelete = (commentId: any, parentCommentId: any) => {
    setDeleteCommentId(commentId);
    if (parentCommentId) {
      deleteComment(
        commentId,
        match.params.id,
        parentCommentId,
        match.path,
        onDeleteSuccess
      );
    } else
      deleteComment(
        commentId,
        match.params.id,
        parentCommentId,
        match.path,
        onDeleteSuccess
      );
  };

  const onUpdate = (e: any, id: any) => {
    if (e.keyCode === 13 && editMessage !== '') {
      updateComment(
        id,
        match.params.id,
        match.path,
        editMessage,
        onEditSuccess
      );
    }
  };

  const onLike = (item: any, parent: any) => {
    likeComment(authState._id, item, parent, true, match.path, () => {});
  };

  const onDislike = (item: any, parent: any) => {
    likeComment(authState._id, item, parent, false, match.path, () => {});
  };

  const onEdit = (item: any) => {
    setEditCommentId(item._id);
    setEditMessage(item.message);
  };

  const onAddSuccess = () => {
    setIsSubmit(false);
    setMessage('');
    setReplyMessage('');
  };

  const onDeleteSuccess = () => {
    setDeleteCommentId(0);
  };

  const onEditSuccess = () => {
    setEditCommentId(0);
    setIsSubmit(false);
  };

  const onReply = (id: any) => {
    setReplyMessage('');
    setReplyCommentId(id);
  };

  const onMouseEnter = (id: any) => {
    setForcusCommentId(id);
  };

  const renderMessageContent = (item: any, parent: any) => (
    <div
      className='flex-left comment-message-item'
      onMouseEnter={() => onMouseEnter(item._id)}
      style={parent ? { marginLeft: '10px' } : {}}
      key={item._id}
    >
      {deleteCommentId === item._id ? (
        <div className='assignment-dialog-overlay' style={{ opacity: '0.5' }} />
      ) : null}
      <Avatar
        alt={item.name}
        src={item.userId.imageURL ? item.userId.imageURL : UserImage}
      />
      <div className='comment-message-item-info'>
        <div className='flex-left'>
          {editCommentId === item._id ? (
            parent ? (
              <TextField
                label='Trả lời'
                variant='outlined'
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                fullWidth
                onKeyDown={(e) => onUpdate(e, item._id)}
                onMouseLeave={() => setEditCommentId(0)}
              />
            ) : (
              <TextField
                label='Bình luận'
                variant='outlined'
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                fullWidth
                onKeyDown={(e) => onUpdate(e, item._id)}
                onMouseLeave={() => setEditCommentId(0)}
              />
            )
          ) : (
            <React.Fragment>
              <div className='comment-message-item-name'>
                {item.userId.name}
              </div>
              <div>{item.message}</div>
            </React.Fragment>
          )}
        </div>
        {editCommentId === item._id ? null : (
          <div className='flex-left'>
            {item.likeIds.length && item.likeIds.includes(authState._id) ? (
              <div
                className='comment-message-item-react'
                onClick={() => onDislike(item, parent)}
              >
                Bỏ thích
              </div>
            ) : (
              <div
                className='comment-message-item-react'
                onClick={() => onLike(item, parent)}
              >
                Thích
              </div>
            )}

            {parent ? null : (
              <div
                className='comment-message-item-react'
                onClick={() => onReply(item._id)}
              >
                Trả lời
              </div>
            )}
            {item.likeIds.length ? (
              <div className='comment-message-item-react'>
                <span className='flex-center'>
                  <LikeIcon
                    color='primary'
                    fontSize='small'
                    style={{ marginRight: '5px' }}
                  />
                  {item.likeIds.length}
                </span>
              </div>
            ) : null}
            <div className='comment-message-item-date'>
              <span>
                <Moment format='HH:mm'>{item.date}</Moment> {' - '}
                <Moment format='DD/MM/YYYY'>{item.date}</Moment>
              </span>
            </div>
          </div>
        )}
      </div>
      <div
        className='flex-column'
        style={
          forcusCommentId === item._id && authState._id === item.userId._id
            ? { visibility: 'visible' }
            : { visibility: 'hidden' }
        }
      >
        <EditIcon
          color='primary'
          fontSize='small'
          className='comment-message-icon'
          onClick={() => onEdit(item)}
        />
        <DeleteIcon
          color='primary'
          fontSize='small'
          className='comment-message-icon'
          onClick={() => onDelete(item._id, parent ? parent._id : null)}
        />
      </div>
    </div>
  );

  const renderMessage = (item: any, parent: any) => {
    const index = orderIndexOfComment(content, item, parent);
    if (index <= NUMBER_OF_COMMENTS_PER_TIME * page)
      return (
        <React.Fragment key={item._id}>
          {renderMessageContent(item, parent)}
          {index === NUMBER_OF_COMMENTS_PER_TIME * page ? (
            <div
              className='comment-message-next'
              onClick={() => setPage(page + 1)}
            >
              Xem thêm bình luận
            </div>
          ) : null}
        </React.Fragment>
      );
    else return null;
  };

  return (
    <React.Fragment>
      <div className='flex-center' style={{ position: 'relative' }}>
        {isSubmit ? (
          <div
            className='assignment-dialog-overlay'
            style={{ opacity: '0.5' }}
          />
        ) : null}
        <Avatar
          alt={authState.name}
          src={authState.imageURL ? authState.imageURL : UserImage}
        />
        <TextField
          label='Bình luận'
          variant='outlined'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          className='comment-message-content'
          onKeyDown={(e) => onEnter(e, null)}
        />
        {isSubmit ? (
          <CircularProgress color='primary' size={40} />
        ) : (
          <SendIcon
            color='primary'
            fontSize='large'
            className='comment-message-send-icon'
            onClick={() => onClick(null)}
          />
        )}
      </div>
      {content && content.length
        ? content.map((item: any) => (
            <React.Fragment key={item._id}>
              {renderMessage(item, null)}
              <div className='comment-message-children-reply border-left'>
                {item.childrenIds && item.childrenIds.length
                  ? item.childrenIds.map((children: any) =>
                      renderMessage(children, item)
                    )
                  : null}
              </div>
              {replyCommentId === item._id && (
                <div className='flex-center comment-message-children-reply-message'>
                  {isSubmit ? (
                    <div
                      className='assignment-dialog-overlay'
                      style={{ opacity: '0.5' }}
                    />
                  ) : null}
                  <Avatar
                    alt={authState.name}
                    src={authState.imageURL ? authState.imageURL : UserImage}
                    style={{ marginLeft: '5px' }}
                  />
                  <TextField
                    label='Trả lời'
                    variant='outlined'
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    fullWidth
                    className='comment-message-content'
                    onKeyDown={(e) => onEnter(e, item._id)}
                  />
                  {isSubmit ? (
                    <CircularProgress color='primary' size={40} />
                  ) : (
                    <SendIcon
                      color='primary'
                      fontSize='large'
                      className='comment-message-send-icon'
                      onClick={() => onClick(item._id)}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          ))
        : null}
    </React.Fragment>
  );
};

export default Comment;

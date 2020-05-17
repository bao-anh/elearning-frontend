import React from 'react';
import '../resources/scss/component/comment.scss';

import { Paper } from '@material-ui/core';

const Comment = () => {
  return (
    <Paper elevation={1} className='main-block-panel comment-panel'>
      <div className='main-block-header-panel'>Bình luận</div>
      <div className='block main-block-content-panel'>
        Nothing to show right now
      </div>
    </Paper>
  );
};

export default Comment;

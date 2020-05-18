import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import UserImage from '../resources/images/user.png';

import '../resources/scss/component/userInfoSideBar.scss';

import { Paper, Grid, Avatar } from '@material-ui/core';

const UserInfoSideBar: FunctionComponent<{
  topicState: any;
  lessonState: any;
}> = ({ topicState, lessonState }) => {
  const renderCurrentLesson = () => {
    const currentLesson = lessonState.current;
    if (currentLesson && currentLesson.type === 1) {
      return (
        <Link
          to={`/lesson/${currentLesson.friendlyUrl}-${currentLesson.id}`}
          className='link'
        >
          {currentLesson.name}
        </Link>
      );
    } else return 'Bạn chưa học bài nào';
  };

  return (
    <Paper elevation={1} className='custom-block-panel user-info-panel'>
      <div className='custom-block-header-panel'>Thông tin cá nhân</div>
      <div className='custom-block-content-panel'>
        <Grid container spacing={1} className='user-info-title-panel'>
          <Grid item xs={3}>
            <Avatar
              alt='user default image'
              src={UserImage}
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>
          <Grid item xs={9}>
            <div style={{ fontWeight: 'bold' }}> Mai Gia Bao Anh </div>
            <div style={{ fontStyle: 'italic' }}>anh.mgb150078@gmail.com</div>
          </Grid>
        </Grid>
        <div className='user-info-content-panel'>Điểm kinh nghiệm: 600</div>
        <div className='user-info-content-panel'>
          Bài học gần đây: {renderCurrentLesson()}
        </div>
      </div>
    </Paper>
  );
};

export default UserInfoSideBar;

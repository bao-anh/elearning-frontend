import React, { FunctionComponent } from 'react';
import UserImage from '../../resources/images/user.png';
import Routes from '../../routes';

import '../../resources/scss/component/userInfoSideBar.scss';

import { Grid, Avatar } from '@material-ui/core';

const UserInfoSideBar: FunctionComponent<{
  authState: any;
  testState?: any;
  toeicState?: any;
  match: any;
}> = ({ authState, testState, toeicState, match }) => {
  const renderContent = () => {
    if (match.path === Routes.TOEIC_SCREEN) {
      return toeicState.data.leaderboard.map((children: any) =>
        children.userId._id === authState._id ? (
          <div key={children.userId._id} className='user-info-content-panel'>
            {`Điểm hiện tại của bạn: ${children.currentScore}`}
          </div>
        ) : null
      );
    } else if (isNaN(Number(match.params.part))) {
      return testState.data.leaderboard.map((children: any) =>
        children.userId._id === authState._id ? (
          <div key={children.userId._id} className='user-info-content-panel'>
            {`Điểm hiện tại của bạn: ${children.currentScore}`}
          </div>
        ) : null
      );
    } else {
      return testState.data.leaderboard.map((children: any) =>
        children.userId._id === authState._id ? (
          <div key={children.userId._id} className='user-info-content-panel'>
            {`Tỷ lệ làm đúng Part ${match.params.part}: ${children.percentComplete} %`}
          </div>
        ) : null
      );
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={1} className='user-info-title-panel'>
        <Grid item xs={3}>
          <Avatar
            alt='user default image'
            src={UserImage}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={9}>
          <div style={{ fontWeight: 'bold' }}>{authState.name}</div>
          <div style={{ fontStyle: 'italic' }}>{authState.email}</div>
        </Grid>
      </Grid>
      {renderContent()}
    </React.Fragment>
  );
};

export default UserInfoSideBar;

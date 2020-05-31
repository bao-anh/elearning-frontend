import React, { FunctionComponent } from 'react';
import UserImage from '../../resources/images/user.png';
import Loading from '../common/Loading';

import '../../resources/scss/component/userInfoSideBar.scss';

import { Paper, Grid, Avatar } from '@material-ui/core';

const UserInfoSideBar: FunctionComponent<{
  authState: any;
  topicState: any;
}> = ({ authState, topicState }) => {
  return (
    <Paper elevation={1} className='custom-block-panel user-info-panel'>
      <div className='custom-block-header-panel'>Thông tin cá nhân</div>
      <div className='custom-block-content-panel'>
        {topicState.isLoadingLargeTopic ? (
          <Loading />
        ) : (
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
            <div className='user-info-content-panel'>
              {`Tiến độ hoàn thành khóa học: ${
                topicState.largeTopic.progressIds.length
                  ? Math.round(
                      topicState.largeTopic.progressIds[0].percentComplete * 10
                    ) / 10
                  : 0
              } %`}
            </div>
          </React.Fragment>
        )}
      </div>
    </Paper>
  );
};

export default UserInfoSideBar;

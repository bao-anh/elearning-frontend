import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

import { Paper } from '@material-ui/core';

import {
  Assignment as AssignmentIcon,
  Group as GroupIcon,
} from '@material-ui/icons';

const UtilitySideBar: FunctionComponent<{ topicState: any }> = ({
  topicState,
}) => {
  return (
    <Paper elevation={1} className='custom-block-panel course-utility-panel'>
      <div className='custom-block-header-panel'>Tiện ích</div>
      <div className='custom-block-content-panel'>
        {topicState.isLoadingLargeTopic ? (
          <Loading />
        ) : (
          <React.Fragment>
            <div className='ultility-content-panel'>
              <AssignmentIcon className='ultility-content-item' />
              <div className='ultility-content-item'>
                <Link
                  to={`/utility/${topicState.largeTopic._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  {'Tài liệu '}
                  <span className='ultility-quantity'>
                    {topicState.largeTopic.documentIds.length}
                  </span>
                </Link>
              </div>
            </div>
            <div className='ultility-content-panel'>
              <GroupIcon className='ultility-content-item' />
              <div className='ultility-content-item'>
                <Link
                  to={`/utility/${topicState.largeTopic._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  {'Thành viên '}
                  <span className='ultility-quantity'>
                    {topicState.largeTopic.memberIds.length}
                  </span>
                </Link>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </Paper>
  );
};

export default UtilitySideBar;

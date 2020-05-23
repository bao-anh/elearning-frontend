import React, { FunctionComponent } from 'react';
import Loading from '../components/Loading';

import { Paper } from '@material-ui/core';

import {
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  EventNote as EventNoteIcon,
  Note as NoteIcon,
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
                <a
                  href='https://www.google.com/'
                  style={{ textDecoration: 'none' }}
                >
                  {'Tài liệu '}
                  <span className='ultility-quantity'>
                    {topicState.largeTopic.documentIds.length}
                  </span>
                </a>
              </div>
            </div>
            <div className='ultility-content-panel'>
              <GroupIcon className='ultility-content-item' />
              <div className='ultility-content-item'>
                <a
                  href='https://www.google.com/'
                  style={{ textDecoration: 'none' }}
                >
                  {'Thành viên '}
                  <span className='ultility-quantity'>
                    {topicState.largeTopic.memberIds.length}
                  </span>
                </a>
              </div>
            </div>
            <div className='ultility-content-panel'>
              <EventNoteIcon className='ultility-content-item' />
              <div className='ultility-content-item'>
                <a
                  href='https://www.google.com/'
                  style={{ textDecoration: 'none' }}
                >
                  {'Lịch học '}
                  <span className='ultility-quantity'>0</span>
                </a>
              </div>
            </div>
            <div className='ultility-content-panel'>
              <NoteIcon className='ultility-content-item' />
              <div className='ultility-content-item'>
                <a
                  href='https://www.google.com/'
                  style={{ textDecoration: 'none' }}
                >
                  {'Ghi chú '}
                </a>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </Paper>
  );
};

export default UtilitySideBar;

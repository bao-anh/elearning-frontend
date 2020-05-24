import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/appstate';
import { convertSecondToMinute } from '../utils';
import '../resources/scss/component/assignmentInfo.scss';

import { Button, CircularProgress } from '@material-ui/core';

const AssignmentInfo: FunctionComponent<{
  assignmentState: any;
  setOpenAssignment: any;
}> = ({ assignmentState, setOpenAssignment }) => {
  const assignmentInfoArray = [
    {
      id: 1,
      title: 'Tên bài',
      data: assignmentState.data.name,
    },
    {
      id: 2,
      title: 'Số câu hỏi',
      data: assignmentState.data.questionIds.length,
    },
    {
      id: 3,
      title: 'Điều kiện qua',
      data: `${assignmentState.data.passPercent} %`,
    },
    {
      id: 4,
      title: 'Thời gian làm bài',
      data: convertSecondToMinute(assignmentState.data.duration),
    },
    {
      id: 5,
      title: 'Tiến độ hoàn thành',
      data: assignmentState.data.progressIds[0]
        ? Math.round(assignmentState.data.progressIds[0].percentComplete)
        : 0,
    },
  ];

  return (
    <React.Fragment>
      {assignmentInfoArray.map((info) =>
        info.title === 'Tiến độ hoàn thành' ? (
          <div
            key={info.id}
            className='assignment-info-item'
            style={{ paddingBottom: 0, paddingTop: '4px' }}
          >
            <div className='assignment-info-title'>{info.title}</div>
            <div
              className='assignment-info-data'
              style={{ position: 'relative' }}
            >
              <div
                style={{
                  position: 'absolute',
                  fontSize: '0.7em',
                  top: '8px',
                  left: '8px',
                }}
              >
                {info.data}%
              </div>
              <CircularProgress
                variant='static'
                style={{ width: '30px', height: '30px' }}
                value={info.data}
              />
            </div>
          </div>
        ) : (
          <div key={info.id} className='assignment-info-item'>
            <div className='assignment-info-title'>{info.title}</div>
            <div className='assignment-info-data'>{info.data}</div>
          </div>
        )
      )}
      <Button
        variant='contained'
        color='primary'
        onClick={() => setOpenAssignment(true)}
        fullWidth
      >
        Làm bài
      </Button>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    assignmentState: state.assignmentState,
    ...ownProps,
  };
};

export default connect(mapStateToProps, null)(AssignmentInfo);

import React, { FunctionComponent } from 'react';
import { convertSecondToMinute } from '../utils';
import '../resources/scss/component/assignmentInfo.scss';

import { Button } from '@material-ui/core';

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
  ];

  return (
    <React.Fragment>
      {assignmentInfoArray.map((info) => (
        <div key={info.id} className='assignment-info-item'>
          <div className='assignment-info-title'>{info.title}</div>
          <div className='assignment-info-data'>{info.data}</div>
        </div>
      ))}
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

export default AssignmentInfo;

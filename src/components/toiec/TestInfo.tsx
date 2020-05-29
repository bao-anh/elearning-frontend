import React, { FunctionComponent } from 'react';
import { convertSecondToMinute, renderNumberOfQuestion } from '../../utils';
import '../../resources/scss/component/assignmentInfo.scss';

import { Button } from '@material-ui/core';

const TestInfo: FunctionComponent<{
  testState: any;
  setOpenTest: any;
}> = ({ testState, setOpenTest }) => {
  const assignmentInfoArray = [
    {
      id: 1,
      title: 'Tên bài',
      data: testState.data.name,
    },
    {
      id: 2,
      title: 'Số câu hỏi',
      data: renderNumberOfQuestion(testState.data.questionIds),
    },
    {
      id: 4,
      title: 'Thời gian làm bài',
      data: convertSecondToMinute(testState.data.duration),
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
        onClick={() => setOpenTest(true)}
        fullWidth
      >
        Làm bài
      </Button>
    </React.Fragment>
  );
};

export default TestInfo;

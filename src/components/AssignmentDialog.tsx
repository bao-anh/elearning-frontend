import React, { FunctionComponent, useState, useEffect } from 'react';
import { Dialog, Slide, IconButton } from '@material-ui/core';
import { Cancel as CancelIcon } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';
import { convertSecondToMinute } from '../utils';

import HourGlass from '../resources/images/hourglass.gif';
import '../resources/scss/assignmentDialog.scss';

interface AssignmentInfo {
  id: number;
  name: string;
  timeShowUp: number;
  duration: number;
  isOpen: boolean;
}

const Transition: any = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AssignmentDialog: FunctionComponent<{
  assignment: AssignmentInfo;
  handleOpenAssignment: Function;
}> = ({ assignment, handleOpenAssignment }) => {
  // const [timeLeft, setTimeLeft] = useState(assignment.duration);
  const [timeLeft, setTimeLeft] = useState(Math.round(Math.random() * 200));
  useEffect(() => {
    const myTimeOut = setTimeout(() => {
      if (assignment.isOpen === true) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(myTimeOut);
    };
  });

  const renderCountDownClock = () => {
    return (
      <React.Fragment>
        <div className='clock-panel'>
          <img
            src={HourGlass}
            alt='hour glass'
            style={{ width: '40%', height: '40%' }}
          />
          <div className='remain-time'>
            <div>
              <p className='remain-time-detail'>
                {convertSecondToMinute(timeLeft)}
              </p>
            </div>
            <div>còn lại</div>
          </div>
        </div>
        <div className='assignment-info-panel'>
          <div className='duration-of-assignment'>
            {`Thời gian làm bài: ${convertSecondToMinute(assignment.duration)}`}
          </div>
          <div className='number-of-question'>{`Số câu hỏi: 4`}</div>
        </div>
      </React.Fragment>
    );
  };

  const renderLeaderboard = () => {
    return <div>Leaderboard</div>;
  };

  return (
    <Dialog
      open={assignment.isOpen ? assignment.isOpen : false}
      aria-labelledby='responsive-dialog-title'
      TransitionComponent={Transition}
      classes={{ paper: 'assignment-dialog-container' }}
    >
      <div className='assigment-dialog-header'>
        <div className='assigment-dialog-header-title'>{assignment.name}</div>
        <IconButton
          className='assigment-dialog-close-icon'
          onClick={() => {
            setTimeLeft(assignment.duration);
            handleOpenAssignment(assignment.id);
          }}
        >
          <CancelIcon />
        </IconButton>
      </div>
      <div className='assigment-dialog-content-panel'>
        <div className='assignment-dialog-content-left-panel'>
          <div className='content-left-panel'>
            {timeLeft > 0 ? renderCountDownClock() : renderLeaderboard()}
          </div>
        </div>
        <div className='assignment-dialog-content-right-panel'>
          This is right panel
        </div>
      </div>
    </Dialog>
  );
};

export default AssignmentDialog;

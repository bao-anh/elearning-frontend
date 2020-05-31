import React, { FunctionComponent, useState } from 'react';
import ReactPlayer from 'react-player';
import { convertSecondToMinute, getQuestionOrder } from '../../utils';
import AssignmentDialog from '../../components/common/AssignmentDialog';
import Reference from '../../components/course/Reference';
import '../../resources/scss/videoDialog.scss';
import '../../resources/scss/lesson.scss';

import { Dialog, IconButton, Slide, Tooltip } from '@material-ui/core';
import {
  Cancel as CancelIcon,
  Assignment as AssignmentIcon,
} from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition: any = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const VideoDialog: FunctionComponent<{
  isOpenVideo: any;
  setOpenVideo: Function;
  lessonState: any;
  match: any;
}> = ({ isOpenVideo, setOpenVideo, lessonState, match }) => {
  const [assignmentArray, setAssignmentArray] = useState([
    ...lessonState.data.assignmentIds,
  ]);

  const handleOpenAssignment = (id: any) => {
    const newAssignmentArray = assignmentArray.map((assignment) => {
      if (id === assignment._id) {
        if (assignment.isOpen)
          return { ...assignment, isOpen: !assignment.isOpen };
        else return { ...assignment, isOpen: true };
      } else return { ...assignment, isOpen: false };
    });
    setAssignmentArray(newAssignmentArray);
  };

  const handleOpenAssignmentWhenTimeCome = (state: any) => {
    assignmentArray.forEach((assignment) => {
      if (Math.round(state.playedSeconds) === assignment.timeToShowUp)
        handleOpenAssignment(assignment._id);
    });
  };

  return (
    <Dialog
      open={isOpenVideo}
      aria-labelledby='responsive-dialog-title'
      TransitionComponent={Transition}
      classes={{ paper: 'video-dialog-container' }}
    >
      {assignmentArray.map((assignment: any) =>
        assignment.isOpen ? (
          <AssignmentDialog
            questionOrderArray={getQuestionOrder(assignment.questionIds)}
            key={assignment._id}
            assignment={assignment}
            handleOpenAssignment={handleOpenAssignment}
            match={match}
          />
        ) : null
      )}
      <div className='video-dialog-header'>
        <div className='video-dialog-header-title'>Bài tập</div>
        <IconButton
          className='video-dialog-close-icon'
          onClick={() => setOpenVideo(false)}
        >
          <CancelIcon />
        </IconButton>
      </div>
      <div className='video-dialog-content-panel'>
        <div className='video-dialog-left-panel'>
          <ReactPlayer
            className='react-player'
            width='100%'
            height='77%'
            url={lessonState.data.videoLink}
            controls={true}
            onProgress={handleOpenAssignmentWhenTimeCome}
          />
          <div className='video-dialog-left-assignment-panel'>
            {assignmentArray.map((assignment: any) => (
              <div
                key={assignment._id}
                className='video-dialog-left-assignment-item-panel'
              >
                <Tooltip
                  title={
                    <div style={{ textAlign: 'center' }}>
                      {assignment.name}
                      <br />
                      {`Thời điểm xuất hiện ${convertSecondToMinute(
                        assignment.timeToShowUp
                      )}`}
                    </div>
                  }
                  placement='top'
                >
                  <IconButton
                    className='video-dialog-left-assignment-icon-panel'
                    onClick={() => handleOpenAssignment(assignment._id)}
                  >
                    <AssignmentIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
        <div className='video-dialog-right-panel'>
          <Reference lessonState={lessonState} />
        </div>
      </div>
    </Dialog>
  );
};

export default VideoDialog;

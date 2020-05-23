import React, { FunctionComponent, useState } from 'react';
import { convertSecondToMinute } from '../utils';
import '../resources/scss/assignmentDialog.scss';

import {
  Dialog,
  Slide,
  IconButton,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { Cancel as CancelIcon } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition: any = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AssignmentDialogResult: FunctionComponent<{
  assignment: any;
  openResult: number;
  handleOpenResult: Function;
}> = ({ assignment, handleOpenResult, openResult }) => {
  const [userAnswer, setUserAnswer] = useState(
    assignment.participantIds[openResult].userAnswer
  );

  const radioButtonLabel = ['(A)', '(B)', '(C)', '(D)'];

  const handleCloseDialog = () => {
    setUserAnswer([]);
  };

  const handleRenderStyle = (question: any, index: number) => {
    return question.correctAnswer === index
      ? { backgroundColor: '#ccefe6', borderRadius: '5px' }
      : {};
  };

  const renderLeftPanel = () => {
    return (
      <Paper elevation={1} className='content-left-panel'>
        <div className='assignment-info-panel'>
          <div className='duration-of-assignment'>
            <div className='assignment-info-title'>Thời gian làm bài</div>
            <div className='assignment-info-data'>
              {convertSecondToMinute(assignment.duration)}
            </div>
          </div>
          <div className='number-of-question'>
            <div className='assignment-info-title'>Số câu hỏi</div>
            <div className='assignment-info-data'>
              {assignment.questionIds.length}
            </div>
          </div>
        </div>
        <div className='assignment-user-answer-content'>
          {assignment.questionIds.map((question: any, index: number) => (
            <div key={index} className='assignment-user-answer-container'>
              <div className='assignment-dialog-overlay' />
              <div className='assignment-user-answer-label'>{index + 1}</div>
              <RadioGroup
                aria-label='gender'
                name={index.toString()}
                value={
                  userAnswer[index] !== null ? Number(userAnswer[index]) : null
                }
                classes={{ root: 'assignment-user-answer-list' }}
              >
                {radioButtonLabel.map((label: string, index: number) => (
                  <FormControlLabel
                    key={index}
                    style={handleRenderStyle(question, index)}
                    value={index}
                    control={<Radio />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </Paper>
    );
  };

  const renderRightPanel = () => {
    return assignment.questionIds.map((question: any, index: number) => (
      <Paper key={index} elevation={1} className='assignment-question-item'>
        <div className='assignment-item assignment-question-item-title'>
          {`Câu ${index + 1}`}
        </div>
        <audio
          controls
          className='assignment-item assignment-question-item-audio'
        >
          <source src={question.soundLink} type='audio/ogg' />
        </audio>
        <img
          src={question.imageLink}
          alt='imageLink'
          className='assignment-item assignment-question-item-audio'
        />
        <RadioGroup
          aria-label='gender'
          name={index.toString()}
          value={userAnswer[index] !== null ? Number(userAnswer[index]) : null}
          className='assignment-dialog-right-radio-group'
        >
          <div className='assignment-dialog-overlay' />
          {radioButtonLabel.map((label: string, index: number) => (
            <FormControlLabel
              key={index}
              style={handleRenderStyle(question, index)}
              value={index}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
        <div dangerouslySetInnerHTML={{ __html: question.content }} />
      </Paper>
    ));
  };

  return (
    <Dialog
      open={openResult !== -1 ? true : false}
      aria-labelledby='responsive-dialog-title'
      TransitionComponent={Transition}
      classes={{ paper: 'assignment-dialog-container' }}
    >
      <div className='assigment-dialog-header'>
        <div className='assigment-dialog-header-title'>{assignment.name}</div>
        <IconButton
          className='assigment-dialog-close-icon'
          onClick={() => {
            handleCloseDialog();
            handleOpenResult(-1);
          }}
        >
          <CancelIcon />
        </IconButton>
      </div>
      <div className='assigment-dialog-content-panel'>
        <div className='assignment-dialog-content-left-panel'>
          {renderLeftPanel()}
        </div>
        <div className='assignment-dialog-content-right-panel'>
          {renderRightPanel()}
        </div>
      </div>
    </Dialog>
  );
};

export default AssignmentDialogResult;

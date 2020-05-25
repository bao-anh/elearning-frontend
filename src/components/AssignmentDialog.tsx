import React, { FunctionComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as operationAction from '../redux/actions/operation';
import { AppState } from '../redux/appstate';
import { convertSecondToMinute } from '../utils';
import Routes from '../routes';
import HourGlass from '../resources/images/hourglasstrans.gif';
import Loading from './Loading';
import '../resources/scss/assignmentDialog.scss';

import {
  Dialog,
  Slide,
  IconButton,
  Paper,
  RadioGroup,
  Button,
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

const AssignmentDialog: FunctionComponent<{
  assignment: any;
  handleOpenAssignment: Function;
  path?: any;
  submitAssignment?: any;
  assigmentState?: any;
}> = ({
  assignment,
  handleOpenAssignment,
  path,
  submitAssignment,
  assigmentState,
}) => {
  const [timeLeft, setTimeLeft] = useState(assignment.duration);
  const [userAnswer, setUserAnswer] = useState([Number]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFetchApiSuccess, setIsFetchApiSuccess] = useState(false);
  const [isOverLay, setIsOverLay] = useState(false);

  useEffect(() => {
    const myTimeOut = setTimeout(() => {
      if (assignment.isOpen === true && !isSubmit) {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 0) {
          setIsSubmit(true);
          setIsFetchApiSuccess(true);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(myTimeOut);
    };
  });

  const radioButtonLabel = ['(A)', '(B)', '(C)', '(D)'];

  const handleChangeStyle = (question: any, index: any) => {
    return isFetchApiSuccess
      ? question.correctAnswer === index
        ? { backgroundColor: '#ccefe6', borderRadius: '5px' }
        : {}
      : {};
  };

  const handleChangeUserAnswer = (e: any) => {
    const newUserAnswer = [...userAnswer];
    newUserAnswer[e.target.name] = e.target.value;
    setUserAnswer(newUserAnswer);
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    setIsOverLay(true);
    handleConvertPoint();
  };

  const handleConvertPoint = () => {
    let count = 0;
    assignment.questionIds.forEach((question: any, index: number) => {
      if (question.correctAnswer === Number(userAnswer[index])) count++;
    });
    const score = 100 * (count / assignment.questionIds.length);

    let percentComplete =
      score / assignment.passPercent > 1
        ? 100
        : (score / assignment.passPercent) * 100;

    if (assignment.progressIds.length) {
      if (percentComplete <= assignment.progressIds[0].percentComplete) {
        percentComplete = 0;
      } else percentComplete -= assignment.progressIds[0].percentComplete;
    }

    submitAssignment(
      assigmentState.data,
      assignment,
      percentComplete,
      userAnswer,
      score,
      () => {
        setIsFetchApiSuccess(true);
        setIsOverLay(false);
      }
    );
  };

  const handleCloseDialog = () => {
    setTimeLeft(assignment.duration);
    handleOpenAssignment(false);
    setIsSubmit(false);
    setUserAnswer([]);
    setIsFetchApiSuccess(false);
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
        <div className='clock-panel'>
          <div className='assignment-info-title'>
            <img src={HourGlass} alt='hour glass' className=' clock-image' />
          </div>
          <div className='assignment-info-data'>
            {convertSecondToMinute(timeLeft)}
          </div>
        </div>
        <div className='assignment-user-answer-content'>
          {assignment.questionIds.map((question: any, index: number) => (
            <div key={index} className='assignment-user-answer-container'>
              {isSubmit ? <div className='assignment-dialog-overlay' /> : null}
              <div className='assignment-user-answer-label'>{index + 1}</div>
              <RadioGroup
                aria-label='gender'
                name={index.toString()}
                value={
                  userAnswer[index] !== null ? Number(userAnswer[index]) : null
                }
                onChange={(e) => handleChangeUserAnswer(e)}
                classes={{ root: 'assignment-user-answer-list' }}
              >
                {radioButtonLabel.map((label: string, index: number) => (
                  <FormControlLabel
                    key={index}
                    style={handleChangeStyle(question, index)}
                    value={index}
                    control={<Radio />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
        <div className='assignment-submit-button'>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            fullWidth
            disabled={isSubmit}
          >
            Nộp bài
          </Button>
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
          onChange={(e) => handleChangeUserAnswer(e)}
          className='assignment-dialog-right-radio-group'
        >
          {isSubmit ? <div className='assignment-dialog-overlay' /> : null}
          {radioButtonLabel.map((label: string, index: number) => (
            <FormControlLabel
              key={index}
              style={handleChangeStyle(question, index)}
              value={index}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
        {isFetchApiSuccess ? (
          <div dangerouslySetInnerHTML={{ __html: question.content }} />
        ) : null}
      </Paper>
    ));
  };

  return (
    <Dialog
      open={assignment.isOpen}
      aria-labelledby='responsive-dialog-title'
      TransitionComponent={Transition}
      classes={{ paper: 'assignment-dialog-container' }}
    >
      {isOverLay ? (
        <div className='assignment-dialog-overlay'>
          <Loading />
        </div>
      ) : null}
      <div className='assigment-dialog-header'>
        <div className='assigment-dialog-header-title'>{assignment.name}</div>
        {path === Routes.LESSON_SCREEN ? (
          <IconButton
            className='assigment-dialog-close-icon'
            onClick={() => {
              handleCloseDialog();
              handleOpenAssignment(assignment._id);
            }}
          >
            <CancelIcon />
          </IconButton>
        ) : (
          <IconButton
            className='assigment-dialog-close-icon'
            onClick={() => handleCloseDialog()}
          >
            <CancelIcon />
          </IconButton>
        )}
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

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    assigmentState: state.assignmentState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  submitAssignment: (
    assigmentState: any,
    assignment: any,
    accumulatePercentComplete: any,
    userAnswer: any,
    score: any,
    onSuccess: any
  ) =>
    dispatch(
      operationAction.submitAssignment(
        assigmentState,
        assignment,
        accumulatePercentComplete,
        userAnswer,
        score,
        onSuccess
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDialog);

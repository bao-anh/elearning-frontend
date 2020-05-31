import React, { FunctionComponent, useState } from 'react';
import { convertSecondToMinute } from '../../utils';
import Routes from '../../routes';
import '../../resources/scss/assignmentDialog.scss';

import {
  Dialog,
  Slide,
  IconButton,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
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
  name: any;
  duration: any;
  openResult: number;
  questionOrderArray: any;
  questionIds: any;
  participantIds: any;
  handleOpenResult: Function;
  match?: any;
}> = ({
  name,
  duration,
  handleOpenResult,
  openResult,
  questionOrderArray,
  questionIds,
  participantIds,
  match,
}) => {
  const [userAnswer, setUserAnswer] = useState(
    participantIds[openResult].userAnswer
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
              {convertSecondToMinute(duration)}
            </div>
          </div>
          <div className='number-of-question'>
            <div className='assignment-info-title'>Số câu hỏi</div>
            <div className='assignment-info-data'>{questionIds.length}</div>
          </div>
        </div>
        <div className='assignment-user-answer-content'>
          {questionIds.map((question: any, index: number) => (
            <div key={index} className='assignment-user-answer-container'>
              <div className='assignment-dialog-overlay' />
              {question.childrenIds && question.childrenIds.length
                ? renderHaveChildAnswer(question, index)
                : renderDoesntHaveChildAnswer(question, index)}
            </div>
          ))}
        </div>
      </Paper>
    );
  };

  const renderHaveChildAnswer = (question: any, parentIndex: number) => {
    const firstIndex =
      questionOrderArray[parentIndex] - question.childrenIds.length;
    return question.childrenIds.map((children: any, childrenIndex: number) => (
      <div key={childrenIndex} className='assignment-user-answer-children'>
        <div className='assignment-user-answer-label'>
          {firstIndex + childrenIndex + 1}
        </div>
        <RadioGroup
          aria-label='gender'
          name={(firstIndex + childrenIndex).toString()}
          value={
            userAnswer[firstIndex + childrenIndex] !== null
              ? Number(userAnswer[firstIndex + childrenIndex])
              : null
          }
          classes={{ root: 'assignment-user-answer-list' }}
        >
          {radioButtonLabel.map((label: string, index: number) => (
            <FormControlLabel
              key={index}
              style={handleRenderStyle(children, index)}
              value={index}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
      </div>
    ));
  };

  const renderDoesntHaveChildAnswer = (question: any, parentIndex: number) => {
    const firstIndex = questionOrderArray[parentIndex];
    return (
      <div className='assignment-user-answer-doesnt-have-children'>
        <div className='assignment-user-answer-label'>{firstIndex + 1}</div>
        <RadioGroup
          aria-label='gender'
          name={firstIndex.toString()}
          value={
            userAnswer[firstIndex] !== null
              ? Number(userAnswer[firstIndex])
              : null
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
    );
  };

  const renderRightPanel = () => {
    return questionIds.map((question: any, index: number) => (
      <Paper key={index} elevation={1} className='assignment-question-item'>
        {question.childrenIds && question.childrenIds.length
          ? renderHaveChildQuestion(question, index)
          : renderDoesntHaveChildQuestion(question, index)}
      </Paper>
    ));
  };

  const renderHaveChildQuestion = (question: any, parentIndex: number) => {
    const firstIndex =
      questionOrderArray[parentIndex] - question.childrenIds.length;
    return (
      <React.Fragment>
        <div className='assignment-item assignment-question-item-title'>
          {`Câu ${firstIndex + 1} - ${questionOrderArray[parentIndex]}`}
        </div>
        {question.soundLink && question.soundLink !== '' ? (
          <audio
            controls
            className='assignment-item assignment-question-item-audio'
          >
            <source src={question.soundLink} type='audio/ogg' />
          </audio>
        ) : null}
        {question.script && question.script !== '' ? (
          <div dangerouslySetInnerHTML={{ __html: question.script }} />
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: question.content }} />
        {question.childrenIds.map((children: any, childrenIndex: number) => (
          <React.Fragment key={childrenIndex}>
            <div className='assignment-question-item-title'>{`Câu ${
              firstIndex + childrenIndex + 1
            }`}</div>
            <div className='assignment-question-item-title'>
              {children.script}
            </div>
            <RadioGroup
              aria-label='gender'
              name={(firstIndex + childrenIndex).toString()}
              value={
                userAnswer[firstIndex + childrenIndex] !== null
                  ? Number(userAnswer[firstIndex + childrenIndex])
                  : null
              }
              className='assignment-dialog-right-radio-group'
            >
              <div className='assignment-dialog-overlay' />
              {children.answerArray.map((label: string, index: number) => (
                <FormControlLabel
                  key={index}
                  style={handleRenderStyle(children, index)}
                  value={index}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
            <div dangerouslySetInnerHTML={{ __html: children.content }} />
            {childrenIndex !== question.childrenIds.length - 1 ? (
              <React.Fragment>
                <br />
                <Divider />
                <br />
              </React.Fragment>
            ) : null}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  };

  const renderDoesntHaveChildQuestion = (
    question: any,
    parentIndex: number
  ) => {
    const firstIndex = questionOrderArray[parentIndex];
    return (
      <React.Fragment>
        <div className='assignment-item assignment-question-item-title'>
          {`Câu ${firstIndex + 1}`}
        </div>
        {question.soundLink && question.soundLink !== '' ? (
          <audio
            controls
            className='assignment-item assignment-question-item-audio'
          >
            <source src={question.soundLink} type='audio/ogg' />
          </audio>
        ) : null}

        {question.imageLink && question.imageLink !== '' ? (
          <img
            src={question.imageLink}
            alt='imageLink'
            className='assignment-item assignment-question-item-audio'
          />
        ) : null}

        {question.script && question.script !== '' ? (
          <div dangerouslySetInnerHTML={{ __html: question.script }} />
        ) : null}

        <div dangerouslySetInnerHTML={{ __html: question.content }} />
        <RadioGroup
          aria-label='gender'
          name={firstIndex.toString()}
          value={
            userAnswer[firstIndex] !== null
              ? Number(userAnswer[firstIndex])
              : null
          }
          className='assignment-dialog-right-radio-group'
        >
          <div className='assignment-dialog-overlay' />
          {question.answerArray && question.answerArray.length
            ? question.answerArray.map((label: string, index: number) => (
                <FormControlLabel
                  key={index}
                  style={handleRenderStyle(question, index)}
                  value={index}
                  control={<Radio />}
                  label={label}
                />
              ))
            : radioButtonLabel.map((label: string, index: number) => (
                <FormControlLabel
                  key={index}
                  style={handleRenderStyle(question, index)}
                  value={index}
                  control={<Radio />}
                  label={label}
                />
              ))}
        </RadioGroup>
      </React.Fragment>
    );
  };

  return (
    <Dialog
      open={openResult !== -1 ? true : false}
      aria-labelledby='responsive-dialog-title'
      TransitionComponent={Transition}
      classes={{ paper: 'assignment-dialog-container' }}
    >
      <div className='assigment-dialog-header'>
        <div className='assigment-dialog-header-title'>{name}</div>
        {match && match.path === Routes.REVIEW_SCREEN ? (
          <IconButton
            className='assigment-dialog-close-icon'
            onClick={() => window.close()}
          >
            <CancelIcon />
          </IconButton>
        ) : (
          <IconButton
            className='assigment-dialog-close-icon'
            onClick={() => {
              handleCloseDialog();
              handleOpenResult(-1);
            }}
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

export default AssignmentDialogResult;

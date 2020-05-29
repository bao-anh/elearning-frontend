import React, { FunctionComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as operationAction from '../../redux/actions/operation';
import { AppState } from '../../redux/appstate';
import { convertSecondToMinute, renderNumberOfQuestion } from '../../utils';
import Routes from '../../routes';
import HourGlass from '../../resources/images/hourglasstrans.gif';
import Loading from './Loading';
import '../../resources/scss/assignmentDialog.scss';

import {
  Dialog,
  Slide,
  IconButton,
  Paper,
  RadioGroup,
  Button,
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

const AssignmentDialog: FunctionComponent<{
  assignment: any;
  handleOpenAssignment: Function;
  match?: any;
  submitAssignment?: any;
  submitTest?: any;
  assigmentState?: any;
  questionOrderArray: any;
}> = ({
  assignment,
  handleOpenAssignment,
  match,
  submitAssignment,
  submitTest,
  assigmentState,
  questionOrderArray,
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
    handleSendPayload();
  };

  const handleConvertPoint = () => {
    let count = 0;

    assignment.questionIds.forEach((question: any, index: number) => {
      if (question.childrenIds && question.childrenIds.length) {
        const firstIndex =
          questionOrderArray[index] - question.childrenIds.length;
        question.childrenIds.forEach((children: any, childrenIndex: number) => {
          if (
            children.correctAnswer ===
            Number(userAnswer[firstIndex + childrenIndex])
          )
            count++;
        });
      }
      if (
        question.correctAnswer === Number(userAnswer[questionOrderArray[index]])
      )
        count++;
    });

    return 100 * (count / renderNumberOfQuestion(assignment.questionIds));
  };

  const handleConvertPointInComplexTest = () => {
    let countIds = [0, 0, 0, 0, 0, 0, 0];
    let numberOfQuestionIds = [0, 0, 0, 0, 0, 0, 0];
    let progressIds = [0, 0, 0, 0, 0, 0, 0];
    let questionIds: any = [];

    assignment.questionIds.forEach((question: any, index: number) => {
      if (question.childrenIds && question.childrenIds.length) {
        const firstIndex =
          questionOrderArray[index] - question.childrenIds.length;

        if (question.part === 7.1 || question.part === 7.2) {
          numberOfQuestionIds[6] += question.childrenIds.length;
        } else {
          numberOfQuestionIds[question.part - 1] += question.childrenIds.length;
        }

        question.childrenIds.forEach((children: any, childrenIndex: number) => {
          if (
            children.correctAnswer ===
            Number(userAnswer[firstIndex + childrenIndex])
          )
            if (question.part === 7.1 || question.part === 7.2) {
              countIds[6]++;
            } else {
              countIds[question.part - 1]++;
            }
        });
      } else {
        numberOfQuestionIds[question.part - 1]++;
        if (
          question.correctAnswer ===
          Number(userAnswer[questionOrderArray[index]])
        )
          countIds[question.part - 1]++;
      }
      questionIds = [...questionIds, question._id];
    });

    let count = 0;

    progressIds.forEach((progress: any, index: any) => {
      count += countIds[index];
      progressIds[index] = Math.round(
        (100 * countIds[index]) / numberOfQuestionIds[index]
      );
    });

    console.log(progressIds);

    return {
      questionIds,
      progressIds,
      score: 100 * (count / renderNumberOfQuestion(assignment.questionIds)),
      numberOfQuestionIds,
    };
  };

  const handleSendPayload = () => {
    if (match.path === Routes.ASSIGNMENT_SCREEN) {
      const score = handleConvertPoint();
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
    } else if (match.path === Routes.TEST_SCREEN) {
      if (match.params.part === 'short-test') {
        const result = handleConvertPointInComplexTest();
        // Phải làm như thế này để tránh lỗi payload quá lớn khi đưa vào backend
        const newAssignment = {
          name: assignment.name,
          questionIds: result.questionIds,
          duration: assignment.duration,
        };

        submitTest(
          newAssignment,
          result.progressIds,
          userAnswer,
          result.score,
          match.params.part,
          () => {
            setIsFetchApiSuccess(true);
            setIsOverLay(false);
          },
          result.numberOfQuestionIds
        );
      } else {
        const score = handleConvertPoint();
        submitTest(
          assignment,
          Math.round(score),
          userAnswer,
          score,
          match.params.part,
          () => {
            setIsFetchApiSuccess(true);
            setIsOverLay(false);
          }
        );
      }
    } else console.error('Something wrong when submit answer');
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
              {renderNumberOfQuestion(assignment.questionIds)}
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
          {assignment.questionIds.map((question: any, parentIndex: number) => (
            <div key={parentIndex}>
              {isSubmit ? <div className='assignment-dialog-overlay' /> : null}
              {question.childrenIds && question.childrenIds.length ? (
                <div className='assignment-user-answer-have-children'>
                  {renderHaveChildrenAnswer(question, parentIndex)}
                </div>
              ) : (
                renderDoesntHaveChildAnswer(question, parentIndex)
              )}
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

  const renderHaveChildrenAnswer = (question: any, parentIndex: number) => {
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
          onChange={(e) => handleChangeUserAnswer(e)}
          classes={{ root: 'assignment-user-answer-list' }}
        >
          {radioButtonLabel.map((label: string, index: number) => (
            <FormControlLabel
              key={index}
              style={handleChangeStyle(children, index)}
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
    );
  };

  const renderRightPanel = () => {
    return assignment.questionIds.map((question: any, parentIndex: number) => (
      <Paper
        key={parentIndex}
        elevation={1}
        className='assignment-question-item'
      >
        {question.childrenIds && question.childrenIds.length
          ? renderHaveChildQuestion(question, parentIndex)
          : renderDoesntHaveChildQuestion(question, parentIndex)}
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
        {isFetchApiSuccess ? (
          <div dangerouslySetInnerHTML={{ __html: question.content }} />
        ) : null}
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
              onChange={(e) => handleChangeUserAnswer(e)}
              className='assignment-dialog-right-radio-group'
            >
              {isSubmit ? <div className='assignment-dialog-overlay' /> : null}
              {children.answerArray.map((label: string, index: number) => (
                <FormControlLabel
                  key={index}
                  style={handleChangeStyle(children, index)}
                  value={index}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
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
        {isFetchApiSuccess ? (
          <div dangerouslySetInnerHTML={{ __html: question.content }} />
        ) : null}
        <RadioGroup
          aria-label='gender'
          name={firstIndex.toString()}
          value={
            userAnswer[firstIndex] !== null
              ? Number(userAnswer[firstIndex])
              : null
          }
          onChange={(e) => handleChangeUserAnswer(e)}
          className='assignment-dialog-right-radio-group'
        >
          {isSubmit ? <div className='assignment-dialog-overlay' /> : null}
          {question.answerArray && question.answerArray.length
            ? question.answerArray.map((label: string, index: number) => (
                <FormControlLabel
                  key={index}
                  style={handleChangeStyle(question, index)}
                  value={index}
                  control={<Radio />}
                  label={label}
                />
              ))
            : radioButtonLabel.map((label: string, index: number) => (
                <FormControlLabel
                  key={index}
                  style={handleChangeStyle(question, index)}
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
      open={assignment.isOpen}
      aria-labelledby='responsive-dialog-title'
      TransitionComponent={Transition}
      classes={{ paper: 'assignment-dialog-container' }}
    >
      {isOverLay ? (
        <div className='assignment-dialog-overlay' style={{ opacity: '0.5' }}>
          <Loading />
        </div>
      ) : null}
      <div className='assigment-dialog-header'>
        <div className='assigment-dialog-header-title'>{assignment.name}</div>
        {match.path === Routes.LESSON_SCREEN ? (
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
  submitTest: (
    assignment: any,
    percentComplete: any,
    userAnswer: any,
    score: any,
    testType: any,
    onSuccess: any,
    numberOfQuestionIds?: any
  ) =>
    dispatch(
      operationAction.submitTest(
        assignment,
        percentComplete,
        userAnswer,
        testType,
        score,
        onSuccess,
        numberOfQuestionIds
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDialog);

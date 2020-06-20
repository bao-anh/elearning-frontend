import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import * as operationAction from '../../redux/actions/operation';
import { AppState } from '../../redux/appstate';
import {
  convertSecondToMinute,
  renderNumberOfQuestion,
  handleExtractErrorMessage,
} from '../../utils';
import Routes from '../../routes';
import HourGlass from '../../resources/images/hourglasstrans.gif';
import Loading from './Loading';
import Timer from './Timer';
import AssignmentDialogAnswer from './AssignmentDialogAnswer';
import AssignmentDialogQuestion from './AssignmentDialogQuestion';
import SnackBar from '../../components/common/SnackBar';
import '../../resources/scss/assignmentDialog.scss';

import { Dialog, Slide, IconButton, Paper, Button } from '@material-ui/core';
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
  match: any;
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
  const [userAnswer, setUserAnswer] = useState([] as any);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFetchApiSuccess, setIsFetchApiSuccess] = useState(false);
  const [isOverLay, setIsOverLay] = useState(false);
  const [changeIndexNeedToRender, setChangeIndexNeedToRender] = useState(0);
  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    severity: '',
    message: '',
  });

  const onError = (response: any) => {
    let message = handleExtractErrorMessage(response);
    setSnackBar({
      isOpen: true,
      severity: 'error',
      message,
    });
  };
  const renderSnackBar = () => {
    if (snackBar.isOpen) {
      return <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />;
    } else return null;
  };

  const handleChangeUserAnswer = (index: any, value: any) => {
    setUserAnswer((uA: any) => {
      const newUserAnswer = [...uA];
      newUserAnswer[index] = value;
      return newUserAnswer;
    });
  };

  const handleChangeQuestionIndex = (parentIndex: any) => {
    setChangeIndexNeedToRender(parentIndex);
  };

  const handleChangeStyle = (question: any, index: any) => {
    return isFetchApiSuccess
      ? question.correctAnswer === index
        ? { backgroundColor: '#ccefe6', borderRadius: '5px' }
        : {}
      : {};
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

    return {
      questionIds,
      progressIds,
      score: 100 * (count / renderNumberOfQuestion(assignment.questionIds)),
      numberOfQuestionIds,
    };
  };

  const handleSendPayload = () => {
    if (
      match.path === Routes.ASSIGNMENT_SCREEN ||
      match.path === Routes.LESSON_SCREEN
    ) {
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
        },
        onError
      );
    } else if (match.path === Routes.TEST_SCREEN) {
      if (
        match.params.part === 'short-test' ||
        match.params.part === 'full-test'
      ) {
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
            <Timer
              duration={assignment.duration}
              isOpen={assignment.isOpen}
              isSubmit={isSubmit}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
        <div className='assignment-user-answer-content'>
          {assignment.questionIds.map((question: any, parentIndex: number) => (
            <AssignmentDialogAnswer
              key={` answer ${question._id}`}
              questionOrderArray={questionOrderArray}
              isFetchApiSuccess={isFetchApiSuccess}
              userAnswer={userAnswer}
              handleChangeStyle={handleChangeStyle}
              question={question}
              parentIndex={parentIndex}
              isSubmit={isSubmit}
              handleChangeUserAnswer={handleChangeUserAnswer}
              changeQuestionIndex={changeIndexNeedToRender}
              handleChangeQuestionIndex={handleChangeQuestionIndex}
            />
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
    return assignment.questionIds.map((question: any, parentIndex: number) => (
      <AssignmentDialogQuestion
        key={question._id}
        questionOrderArray={questionOrderArray}
        isFetchApiSuccess={isFetchApiSuccess}
        userAnswer={userAnswer}
        isSubmit={isSubmit}
        handleChangeStyle={handleChangeStyle}
        question={question}
        parentIndex={parentIndex}
        handleChangeUserAnswer={handleChangeUserAnswer}
        changeQuestionIndex={changeIndexNeedToRender}
        handleChangeQuestionIndex={handleChangeQuestionIndex}
      />
    ));
  };

  return (
    <Dialog
      open={assignment.isOpen}
      aria-labelledby='responsive-dialog-title'
      TransitionComponent={Transition}
      classes={{ paper: 'assignment-dialog-container' }}
    >
      {renderSnackBar()}
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
    onSuccess: any,
    onError: any
  ) =>
    dispatch(
      operationAction.submitAssignment(
        assigmentState,
        assignment,
        accumulatePercentComplete,
        userAnswer,
        score,
        onSuccess,
        onError
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

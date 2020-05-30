import React from 'react';

import {
  Paper,
  RadioGroup,
  FormControlLabel,
  Divider,
  Radio,
} from '@material-ui/core';

const AssignmentDialogQuestion: React.FC<{
  questionOrderArray: any;
  isFetchApiSuccess: any;
  userAnswer: any;
  isSubmit: any;
  handleChangeStyle: any;
  question: any;
  parentIndex: any;
  handleChangeUserAnswer: any;
  changeQuestionIndex: any;
  handleChangeQuestionIndex: any;
}> = React.memo(
  ({
    questionOrderArray,
    isFetchApiSuccess,
    userAnswer,
    isSubmit,
    handleChangeStyle,
    question,
    parentIndex,
    handleChangeUserAnswer,
    changeQuestionIndex,
    handleChangeQuestionIndex,
  }) => {
    const radioButtonLabel = ['(A)', '(B)', '(C)', '(D)'];

    const onChangeUserAnswer = (e: any) => {
      handleChangeQuestionIndex(parentIndex);
      handleChangeUserAnswer(e.target.name, e.target.value);
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
            <React.Fragment key={children._id}>
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
                onChange={(e) => onChangeUserAnswer(e)}
                className='assignment-dialog-right-radio-group'
              >
                {isSubmit ? (
                  <div className='assignment-dialog-overlay' />
                ) : null}
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
            onChange={(e) => onChangeUserAnswer(e)}
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
      <Paper
        key={question._id}
        elevation={1}
        className='assignment-question-item'
      >
        {question.childrenIds && question.childrenIds.length
          ? renderHaveChildQuestion(question, parentIndex)
          : renderDoesntHaveChildQuestion(question, parentIndex)}
      </Paper>
    );
  },
  (prevProps, nextProps) => {
    if (nextProps.changeQuestionIndex === nextProps.parentIndex) return false;
    if (prevProps.isFetchApiSuccess !== nextProps.isFetchApiSuccess)
      return false;
    return true;
  }
);

export default AssignmentDialogQuestion;

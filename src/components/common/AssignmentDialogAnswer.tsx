import React from 'react';

import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const AssignmentDialogAnswer: React.FC<{
  questionOrderArray: any;
  userAnswer: any;
  handleChangeStyle: any;
  question: any;
  parentIndex: any;
  isSubmit: any;
  handleChangeUserAnswer: any;
  isFetchApiSuccess: any;
  changeQuestionIndex: any;
  handleChangeQuestionIndex: any;
}> = React.memo(
  ({
    questionOrderArray,
    userAnswer,
    handleChangeStyle,
    question,
    parentIndex,
    isSubmit,
    handleChangeUserAnswer,
    isFetchApiSuccess,
    changeQuestionIndex,
    handleChangeQuestionIndex,
  }) => {
    const radioButtonLabel = ['(A)', '(B)', '(C)', '(D)'];

    const onChangeUserAnswer = (e: any) => {
      handleChangeQuestionIndex(parentIndex);
      handleChangeUserAnswer(e.target.name, e.target.value);
    };

    const renderHaveChildrenAnswer = (question: any, parentIndex: number) => {
      const firstIndex =
        questionOrderArray[parentIndex] - question.childrenIds.length;
      return question.childrenIds.map(
        (children: any, childrenIndex: number) => (
          <div key={children._id} className='assignment-user-answer-children'>
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
              onChange={(e) => onChangeUserAnswer(e)}
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
        )
      );
    };

    const renderDoesntHaveChildAnswer = (
      question: any,
      parentIndex: number
    ) => {
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
            onChange={(e) => onChangeUserAnswer(e)}
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

    return (
      <div>
        {isSubmit ? <div className='assignment-dialog-overlay' /> : null}
        {question.childrenIds && question.childrenIds.length ? (
          <div className='assignment-user-answer-have-children'>
            {renderHaveChildrenAnswer(question, parentIndex)}
          </div>
        ) : (
          renderDoesntHaveChildAnswer(question, parentIndex)
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (nextProps.changeQuestionIndex === nextProps.parentIndex) return false;
    if (prevProps.isFetchApiSuccess !== nextProps.isFetchApiSuccess)
      return false;
    return true;
  }
);

export default AssignmentDialogAnswer;

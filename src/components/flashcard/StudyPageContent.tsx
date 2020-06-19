import React, { FunctionComponent, useState } from 'react';
import PracticeCorrectAnswer from './PracticeCorrectAnswer';
import StudyPageMulChoice from './StudyPageMulChoice';
import StudyPageComplete from './StudyPageComplete';

import { Paper, TextField, Button } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

const StudyContentPage: FunctionComponent<{
  fetchStudyBySetId: Function;
  fetchAllStudy: Function;
  studyAnswer: any;
  studyState: any;
  onError: any;
  match: any;
}> = ({
  fetchStudyBySetId,
  fetchAllStudy,
  studyAnswer,
  studyState,
  onError,
  match,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isRemainAnswerIncorrect, setIsRemainAnswerIncorrect] = useState(false);
  const [isFamiliarAnswerIncorrect, setIsFamiliarAnswerIncorrect] = useState(
    false
  );

  const handleChange = (e: any) => {
    setUserAnswer(e.target.value);
  };

  const handlePressKey = (e: any) => {
    if (e.keyCode === 13) {
      handleWriteAnswer(e);
    }
  };

  const handleChooseAnswer = (index: any, choiceArray: any) => {
    if (choiceArray[index].name === studyState.current.name) {
      setIsAnswerCorrect(true);
      setTimeout(() => {
        setUserAnswer('');
        setIsAnswerCorrect(false);
        studyAnswer('remain', true, match.params.id);
      }, 1000);
    } else {
      setUserAnswer(choiceArray[index].name);
      setIsRemainAnswerIncorrect(true);
    }
  };

  const handleWriteAnswer = (e: any) => {
    e.preventDefault();
    const answer = userAnswer.trim().toLowerCase();
    if (answer === studyState.current.name.trim().toLowerCase()) {
      setIsAnswerCorrect(true);
      setTimeout(() => {
        setUserAnswer('');
        setIsAnswerCorrect(false);
        studyAnswer('familiar', true, match.params.id);
      }, 1000);
    } else {
      setIsFamiliarAnswerIncorrect(true);
    }
  };

  const handleNextWhenRemainIncorrect = () => {
    setUserAnswer('');
    setIsRemainAnswerIncorrect(false);
    studyAnswer('remain', false, match.params.id);
  };

  const handleNextWhenFamiliarIncorrect = () => {
    setUserAnswer('');
    setIsFamiliarAnswerIncorrect(false);
    studyAnswer('familiar', false, match.params.id);
  };

  const renderQuestion = () => {
    const { remain, current } = studyState;
    if (remain.some((element: any) => element._id === current._id)) {
      return (
        <StudyPageMulChoice
          studyState={studyState}
          handleChooseAnswer={handleChooseAnswer}
          isAnswerCorrect={isAnswerCorrect}
        />
      );
    } else return renderFamilarQuestion();
  };

  const renderFamilarQuestion = () => {
    const { definition, imageURL } = studyState.current;
    return (
      <React.Fragment>
        <div className='write-page-content'>
          <div className='write-page-image'>
            {imageURL && imageURL !== '' ? (
              <img src={imageURL} alt='term' height='100%' width='100%' />
            ) : null}
          </div>
          <div className='write-page-definition'>{definition}</div>
        </div>
        <div className='write-page-form'>
          <TextField
            id='standard-basic'
            label='Câu trả lời'
            value={userAnswer}
            onChange={(e) => handleChange(e)}
            fullWidth
            style={{ marginRight: '10px' }}
            onKeyDown={handlePressKey}
            autoFocus
          />
          {isAnswerCorrect ? (
            <Button
              variant='contained'
              style={{
                width: '200px',
                backgroundColor: '#4caf50',
                color: 'white',
              }}
              startIcon={<CheckIcon />}
              onClick={handleWriteAnswer}
            >
              Đúng
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              style={{ width: '200px' }}
              onClick={handleWriteAnswer}
            >
              Đáp án
            </Button>
          )}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Paper elevation={1} className='write-page-container'>
      {Object.keys(studyState.current).length ? (
        isRemainAnswerIncorrect ? (
          <PracticeCorrectAnswer
            data={studyState.current}
            userAnswer={userAnswer}
            handleNextWhenIncorrect={handleNextWhenRemainIncorrect}
          />
        ) : isFamiliarAnswerIncorrect ? (
          <PracticeCorrectAnswer
            data={studyState.current}
            userAnswer={userAnswer}
            handleNextWhenIncorrect={handleNextWhenFamiliarIncorrect}
          />
        ) : (
          renderQuestion()
        )
      ) : (
        <StudyPageComplete
          fetchStudyBySetId={fetchStudyBySetId}
          fetchAllStudy={fetchAllStudy}
          onError={onError}
          match={match}
        />
      )}
    </Paper>
  );
};

export default StudyContentPage;

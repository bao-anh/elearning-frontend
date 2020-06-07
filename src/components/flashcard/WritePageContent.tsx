import React, { FunctionComponent, useState } from 'react';
import PracticeCorrectAnswer from './PracticeCorrectAnswer';
import PracticeResult from './PracticeResult';

import { Paper, Button, TextField } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

const WritePageContent: FunctionComponent<{
  writeAnswer: any;
  writeState: any;
  match: any;
  onError: any;
  fetchWriteBySetId: Function;
  updateRemember: Function;
}> = ({
  match,
  onError,
  fetchWriteBySetId,
  writeAnswer,
  writeState,
  updateRemember,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isAnswerIncorrect, setIsAnswerIncorrect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: any) => {
    setUserAnswer(e.target.value);
  };

  const handlePressKey = (e: any) => {
    if (e.keyCode === 13) {
      onSubmit(e);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const answer = userAnswer.trim().toLowerCase();
    if (answer === writeState.remain[0].name.trim().toLowerCase()) {
      setIsAnswerCorrect(true);
      setTimeout(() => {
        setUserAnswer('');
        setIsAnswerCorrect(false);
        writeAnswer(true);
      }, 1000);
    } else {
      setIsAnswerIncorrect(true);
    }
  };

  const handleNextWhenIncorrect = () => {
    setUserAnswer('');
    setIsAnswerIncorrect(false);
    writeAnswer(false);
  };

  const handleRestart = () => {
    setIsSubmit(true);
    updateRemember(match.params.id, 'write', onSuccess, onError);
  };

  const onSuccess = () => {
    setIsSubmit(false);
    fetchWriteBySetId(match.params.id, onError);
  };

  const renderQuestion = () => {
    if (writeState.remain.length) {
      const { definition, imageURL } = writeState.remain[0];
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
                onClick={onSubmit}
              >
                Đúng
              </Button>
            ) : (
              <Button
                variant='contained'
                color='primary'
                style={{ width: '200px' }}
                onClick={onSubmit}
              >
                Đáp án
              </Button>
            )}
          </div>
        </React.Fragment>
      );
    }
  };

  return (
    <Paper className='write-page-container'>
      {writeState.remain.length ? (
        isAnswerIncorrect ? (
          <PracticeCorrectAnswer
            data={writeState.remain[0]}
            userAnswer={userAnswer}
            handleNextWhenIncorrect={handleNextWhenIncorrect}
          />
        ) : (
          renderQuestion()
        )
      ) : (
        <PracticeResult
          practiceState={writeState}
          handleRestart={handleRestart}
          isSubmit={isSubmit}
        />
      )}
    </Paper>
  );
};

export default WritePageContent;

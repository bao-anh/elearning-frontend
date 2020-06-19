import React, { FunctionComponent, useState, useEffect } from 'react';
import PracticeCorrectAnswer from './PracticeCorrectAnswer';
import PracticeResult from './PracticeResult';
// @ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';

import {
  Button,
  TextField,
  Paper,
  Typography,
  IconButton,
} from '@material-ui/core';
import {
  Check as CheckIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
} from '@material-ui/icons';

const ListenPageContent: FunctionComponent<{
  listenState: any;
  match: any;
  onError: any;
  fetchListenBySetId: Function;
  fetchAllListen: Function;
  updateRemember: Function;
  listenAnswer: Function;
}> = ({
  match,
  onError,
  fetchListenBySetId,
  fetchAllListen,
  listenState,
  updateRemember,
  listenAnswer,
}) => {
  const { speak } = useSpeechSynthesis();
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isAnswerIncorrect, setIsAnswerIncorrect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (listenState.remain.length) {
      speak({ text: listenState.remain[0].name });
    }
    //eslint-disable-next-line
  }, [listenState.remain.length && listenState.remain[0].name]);

  const handlePressKey = (e: any) => {
    if (e.keyCode === 13) {
      onSubmit(e);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const answer = userAnswer.trim().toLowerCase();
    if (answer === listenState.remain[0].name.trim().toLowerCase()) {
      setIsAnswerCorrect(true);
      setTimeout(() => {
        setUserAnswer('');
        setIsAnswerCorrect(false);
        listenAnswer(true, match.params.id);
      }, 1000);
    } else {
      setIsAnswerIncorrect(true);
    }
  };

  const handleChange = (e: any) => {
    setUserAnswer(e.target.value);
  };

  const handleNextWhenIncorrect = () => {
    setUserAnswer('');
    setIsAnswerIncorrect(false);
    listenAnswer(false, match.params.id);
  };

  const handleRestart = () => {
    setIsSubmit(true);
    updateRemember(match.params.id, 'listen', onSuccess, onError);
  };

  const onSuccess = () => {
    setIsSubmit(false);
    if (match.params.id === 'all') fetchAllListen(onError);
    else fetchListenBySetId(match.params.id, onError);
  };

  const renderQuestion = () => {
    if (listenState.remain.length) {
      const { name } = listenState.remain[0];
      return (
        <React.Fragment>
          <div className='flex-left' style={{ flexGrow: 1 }}>
            <IconButton onClick={() => speak({ text: name })}>
              <RecordVoiceOverIcon color='primary' fontSize='large' />
            </IconButton>
            <Typography
              variant='h6'
              color='primary'
              style={{ marginLeft: '10px' }}
            >
              Hãy nhập vào những gì bạn nghe được
            </Typography>
          </div>
          <div className='write-page-form'>
            <TextField
              id='standard-basic'
              label='Câu trả lời'
              value={userAnswer}
              onChange={(e) => handleChange(e)}
              fullWidth
              autoFocus
              onKeyDown={handlePressKey}
              style={{ marginRight: '10px' }}
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
      {listenState.remain.length ? (
        isAnswerIncorrect ? (
          <PracticeCorrectAnswer
            data={listenState.remain[0]}
            userAnswer={userAnswer}
            handleNextWhenIncorrect={handleNextWhenIncorrect}
          />
        ) : (
          renderQuestion()
        )
      ) : (
        <PracticeResult
          practiceState={listenState}
          handleRestart={handleRestart}
          isSubmit={isSubmit}
        />
      )}
    </Paper>
  );
};

export default ListenPageContent;

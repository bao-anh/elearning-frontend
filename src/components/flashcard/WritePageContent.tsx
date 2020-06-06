import React, { FunctionComponent, useState } from 'react';

import {
  Paper,
  Button,
  TextField,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons';

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
    updateRemember(match.params.id, onSuccess, onError);
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
          <form onSubmit={onSubmit} className='write-page-form'>
            <TextField
              id='standard-basic'
              label='Câu trả lời'
              value={userAnswer}
              onChange={(e) => handleChange(e)}
              fullWidth
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
          </form>
        </React.Fragment>
      );
    }
  };

  const renderCorrectAnswer = () => {
    const { name, definition, imageURL } = writeState.remain[0];
    return (
      <React.Fragment>
        <div className='write-page-correct-answer-container'>
          <div className='write-page-correct-answer-content'>
            <div className='write-page-correct-answer-header'>
              <div
                className='write-page-correct-title write-page-font-bold'
                style={{ color: '#aaaaaa' }}
              >
                Định nghĩa
              </div>
              <div>{definition}</div>
            </div>
            <div className='write-page-correct-answer-image'>
              {imageURL && imageURL !== '' ? (
                <img src={imageURL} alt='term' width='100%' height='100%' />
              ) : null}
            </div>
          </div>
          <div className='write-page-correct-answer-content'>
            <div className='write-page-correct-answer-item'>
              <div
                className='write-page-font-bold'
                style={{ color: '#f44336' }}
              >
                Đáp án của bạn
              </div>
              <div>{userAnswer}</div>
            </div>
            <div className='write-page-correct-answer-item'>
              <div
                className='write-page-font-bold'
                style={{ color: '#4caf50' }}
              >
                Đáp án đúng
              </div>
              <div>{name}</div>
            </div>
          </div>
        </div>
        <form onSubmit={handleNextWhenIncorrect} className='write-page-form'>
          <Button
            variant='contained'
            color='primary'
            style={{ width: '153px', textAlign: 'right' }}
            onClick={() => handleNextWhenIncorrect()}
          >
            Tiếp tục
          </Button>
        </form>
      </React.Fragment>
    );
  };

  const renderResult = () => {
    return (
      <React.Fragment>
        <div className='write-page-result-container'>
          <div className='write-page-result-left'>
            <div className='write-page-result-title'>Kết quả</div>
            <div className='write-page-result-subtitle'>{`${
              writeState.correct.length
            }/${writeState.termIds.length} - ${Math.round(
              (writeState.correct.length / writeState.termIds.length) * 100
            )}%`}</div>
          </div>
          <Button
            variant='contained'
            color='primary'
            className='write-page-result-right'
            onClick={() => handleRestart()}
            disabled={isSubmit}
          >
            {isSubmit ? (
              <CircularProgress color='primary' size={22} />
            ) : (
              'Bắt đầu lại'
            )}
          </Button>
        </div>
        <Divider />
        <div className='write-page-result-content'>
          {writeState.incorrect.map((element: any) => (
            <div key={element._id} className='write-page-result-item'>
              <CloseIcon htmlColor='#f44336' />
              <div className='write-page-result-name'>{element.name}</div>
              <div className='write-page-result-definition'>
                {element.definition}
              </div>
              <div className='write-page-result-image'>
                {element.imageURL && element.imageURL !== '' ? (
                  <img
                    src={element.imageURL}
                    alt='term'
                    height='100%'
                    width='100%'
                  />
                ) : null}
              </div>
            </div>
          ))}
          <Divider />
          {writeState.correct.map((element: any) => (
            <div key={element._id} className='write-page-result-item'>
              <CheckIcon htmlColor='#4caf50' />
              <div className='write-page-result-name'>{element.name}</div>
              <div className='write-page-result-definition'>
                {element.definition}
              </div>
              <div className='write-page-result-image'>
                {element.imageURL && element.imageURL !== '' ? (
                  <img
                    src={element.imageURL}
                    alt='term'
                    height='100%'
                    width='100%'
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Paper className='write-page-container'>
      {writeState.remain.length
        ? isAnswerIncorrect
          ? renderCorrectAnswer()
          : renderQuestion()
        : renderResult()}
    </Paper>
  );
};

export default WritePageContent;

import React, { FunctionComponent } from 'react';

import { Button } from '@material-ui/core';

const PracticeCorrectAnswer: FunctionComponent<{
  remain: any;
  userAnswer: any;
  handleNextWhenIncorrect: any;
}> = ({ remain, userAnswer, handleNextWhenIncorrect }) => {
  const { name, definition, imageURL } = remain[0];
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
            <div className='write-page-font-bold' style={{ color: '#f44336' }}>
              Đáp án của bạn
            </div>
            <div>{userAnswer}</div>
          </div>
          <div className='write-page-correct-answer-item'>
            <div className='write-page-font-bold' style={{ color: '#4caf50' }}>
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

export default PracticeCorrectAnswer;

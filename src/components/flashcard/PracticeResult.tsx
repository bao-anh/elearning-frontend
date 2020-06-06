import React, { FunctionComponent } from 'react';

import { Button, CircularProgress, Divider } from '@material-ui/core';
import { Close as CloseIcon, Check as CheckIcon } from '@material-ui/icons';

const PracticeResult: FunctionComponent<{
  practiceState: any;
  handleRestart: any;
  isSubmit: any;
}> = ({ practiceState, handleRestart, isSubmit }) => {
  return (
    <React.Fragment>
      <div className='write-page-result-container'>
        <div className='write-page-result-left'>
          <div className='write-page-result-title'>Kết quả</div>
          <div className='write-page-result-subtitle'>{`${
            practiceState.correct.length
          }/${practiceState.termIds.length} - ${Math.round(
            (practiceState.correct.length / practiceState.termIds.length) * 100
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
        {practiceState.incorrect.map((element: any) => (
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
        {practiceState.correct.map((element: any) => (
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

export default PracticeResult;

import React, { FunctionComponent, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import { Grid, Paper } from '@material-ui/core';
import {
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from '@material-ui/icons';

const SetPageCard: FunctionComponent<{ setState: any }> = ({ setState }) => {
  const [termArray] = useState(setState.termIds);
  const [cardIndex, setCardIndex] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePrevCard = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
      setIsNext(false);
      setIsFlipped(false);
    }
  };

  const handleNextCard = () => {
    if (cardIndex < setState.termIds.length - 1) {
      setCardIndex(cardIndex + 1);
      setIsNext(true);
      setIsFlipped(false);
    }
  };

  return (
    <Grid item xs={6} className='set-page-filp-card-left'>
      {termArray && (
        <div className='set-page-filp-card-content'>
          {termArray.map((term: any, index: any) => (
            <div
              key={term._id}
              className={`set-page-filp-card-paper ${
                index === cardIndex ? (isNext ? 'slide-out' : 'slide-in') : ''
              }`}
              style={
                index === cardIndex
                  ? { visibility: 'visible', height: '300px' }
                  : { visibility: 'hidden', height: '0px' }
              }
            >
              <ReactCardFlip
                containerStyle={{ height: '100%' }}
                isFlipped={isFlipped}
                flipDirection='vertical'
                flipSpeedBackToFront={0.5}
                flipSpeedFrontToBack={0.5}
              >
                <Paper
                  elevation={3}
                  onClick={() => setIsFlipped(!isFlipped)}
                  className='set-page-filp-card-paper-content'
                  style={{ lineHeight: '300px' }}
                >
                  {term.name}
                </Paper>
                <Paper
                  elevation={3}
                  onClick={() => setIsFlipped(!isFlipped)}
                  className='set-page-filp-card-paper-content'
                  style={{ padding: '10px' }}
                >
                  <div className='set-page-filp-card-paper-definition'>
                    {term.imageURL ? (
                      <img
                        src={term.imageURL}
                        alt='term'
                        className='set-page-filp-card-paper-image'
                      />
                    ) : null}
                    <div className='set-page-filp-card-paper-definition-content'>
                      {term.definition}
                    </div>
                  </div>
                </Paper>
              </ReactCardFlip>
            </div>
          ))}
          <div className='set-page-filp-card-navigate'>
            <NavigateBeforeIcon
              className='set-page-filp-card-navigate-icon'
              onClick={() => handlePrevCard()}
            />
            {`${cardIndex + 1}/${termArray.length}`}
            <NavigateNextIcon
              className='set-page-filp-card-navigate-icon'
              onClick={() => handleNextCard()}
            />
          </div>
        </div>
      )}
    </Grid>
  );
};

export default SetPageCard;

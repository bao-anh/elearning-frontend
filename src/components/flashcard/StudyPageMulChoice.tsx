import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { shuffleArray, randomMultipleElementLeftOfArray } from '../../utils';

import { Check as CheckIcon } from '@material-ui/icons';

const answerRandomArray = [
  { name: 'book' },
  { name: 'certain' },
  { name: 'lotus' },
  { name: 'fountain' },
  { name: 'term' },
  { name: 'permission' },
  { name: 'canvas' },
  { name: 'absolute' },
  { name: 'relative' },
  { name: 'remain' },
];

const StudyPageMulChoice: FunctionComponent<{
  studyState: any;
  handleChooseAnswer: any;
  isAnswerCorrect: any;
}> = ({ studyState, handleChooseAnswer, isAnswerCorrect }) => {
  useEffect(() => {
    window.addEventListener('keydown', handlePressKey);
    return () => {
      window.removeEventListener('keydown', handlePressKey);
    };
    //eslint-disable-next-line
  }, [studyState.current]);

  const choiceArray = useMemo(
    () =>
      studyState.termIds.length >= 4
        ? shuffleArray([
            ...randomMultipleElementLeftOfArray(
              studyState.termIds,
              studyState.current,
              3
            ),
            studyState.current,
          ])
        : shuffleArray([
            ...randomMultipleElementLeftOfArray(
              [...studyState.termIds, ...answerRandomArray],
              studyState.current,
              3
            ),
            studyState.current,
          ]),
    //eslint-disable-next-line
    [studyState.current]
  );

  const { imageURL, definition } = studyState.current;

  const handlePressKey = (e: any) => {
    if (e.keyCode === 49) handleChooseAnswer(0, choiceArray);
    else if (e.keyCode === 50) handleChooseAnswer(1, choiceArray);
    else if (e.keyCode === 51) handleChooseAnswer(2, choiceArray);
    else if (e.keyCode === 52) handleChooseAnswer(3, choiceArray);
    window.removeEventListener('keydown', handlePressKey);
  };

  return (
    <div className='flex-column full-height'>
      <div className='write-page-content'>
        <div className='write-page-image'>
          {imageURL && imageURL !== '' ? (
            <img src={imageURL} alt='term' height='100%' width='100%' />
          ) : null}
        </div>
        <div className='write-page-definition'>{definition}</div>
      </div>
      <div className='flex-center full-width text-center'>
        {choiceArray.map((choice: any, index: number) => {
          if (choice.name === studyState.current.name && isAnswerCorrect) {
            return (
              <div
                key={choice._id ? choice._id : index}
                className='flex-center study-page-choice-right-item'
                style={index ? { marginLeft: '20px' } : {}}
                onClick={() => handleChooseAnswer(index, choiceArray)}
              >
                <CheckIcon htmlColor='white' />
                <div style={{ color: 'white' }}> Đúng </div>
              </div>
            );
          } else {
            return (
              <div
                key={choice._id ? choice._id : index}
                className='study-page-choice-item'
                style={index ? { marginLeft: '20px' } : {}}
                onClick={() => handleChooseAnswer(index, choiceArray)}
              >
                <div className='study-page-choice-number'>{index + 1}</div>
                <div>{choice.name}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default StudyPageMulChoice;

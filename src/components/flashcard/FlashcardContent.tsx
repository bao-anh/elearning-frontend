import React, { FunctionComponent } from 'react';

import { Paper, Typography } from '@material-ui/core';
import { Lock as LockIcon, Public as PublicIcon } from '@material-ui/icons';

const FlashcardContent: FunctionComponent<{ setState: any; history: any }> = ({
  setState,
  history,
}) => {
  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className='flash-card-content-container'>
      {setState.data.map((set: any, index: number) => (
        <Paper
          key={set._id}
          style={(index + 1) % 3 === 0 ? { marginRight: 0 } : {}}
          className='flash-card-content-item'
        >
          <div className='flash-card-content-item-border' onClick={handleClick}>
            <div className='flash-card-content-content'>
              <div className='flash-card-content-left'>
                <h1 className='flash-card-content-left-header'>{set.name}</h1>
                <div className='flash-card-content-left-subtitle'>
                  <div
                    style={{ marginRight: '5px' }}
                  >{`${set.termIds.length} thuật ngữ `}</div>
                  <div>
                    {set.visiable ? (
                      <PublicIcon fontSize='small' />
                    ) : (
                      <LockIcon fontSize='small' />
                    )}
                  </div>
                </div>
              </div>
              {set.imageURL ? (
                <div className='flash-card-content-right'>
                  <img
                    src={set.imageURL}
                    className='flash-card-content-image'
                  />{' '}
                </div>
              ) : null}
            </div>
            <div className='flash-card-content-footer'>
              <div style={{ marginRight: '5px' }}>{`Được tạo bởi `}</div>
              <Typography color='primary'>{set.ownerId.name}</Typography>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default FlashcardContent;

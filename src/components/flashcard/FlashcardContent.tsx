import React, { FunctionComponent } from 'react';

import { Paper, Typography } from '@material-ui/core';
import {
  Lock as LockIcon,
  Public as PublicIcon,
  Edit as EditIcon,
} from '@material-ui/icons';

const FlashcardContent: FunctionComponent<{
  setState: any;
  history: any;
  setIsEdit: any;
  setSetInfo: any;
}> = ({ setState, history, setIsEdit, setSetInfo }) => {
  const handleClick = (set: any) => {
    if (set.termIds.length) {
      history.push(`/set/${set._id}`);
    } else {
      history.push(`/set/${set._id}/edit`);
    }
  };

  return (
    <div className='flash-card-content-container'>
      {setState.data.map((set: any, index: number) => (
        <Paper
          key={set._id}
          style={(index + 1) % 3 === 0 ? { marginRight: 0 } : {}}
          className='flash-card-content-item'
        >
          <div
            className='flash-card-content-item-border'
            onClick={() => handleClick(set)}
          >
            <div className='flash-card-content-content'>
              <div className='flash-card-content-left'>
                <h1 className='flash-card-content-left-header'>{set.name}</h1>
              </div>
              {set.imageURL ? (
                <div className='flash-card-content-right'>
                  <img
                    src={set.imageURL}
                    className='flash-card-content-image'
                    alt='set'
                  />
                </div>
              ) : null}
            </div>
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
          <div className='flash-card-content-footer'>
            <div className='flex-center'>
              <div style={{ marginRight: '5px' }}>Được tạo bởi</div>
              <Typography color='primary'>{set.ownerId.name}</Typography>
            </div>
            <div>
              <EditIcon
                fontSize='small'
                className='flash-card-content-edit-icon'
                onClick={() => {
                  setSetInfo({
                    _id: set._id,
                    name: set.name,
                    description: set.description,
                    imageLocalURL: set.imageURL,
                    imageLocalFile: null,
                    imageURL: set.imageURL,
                    visiable: set.visiable,
                    editable: set.editable,
                  });
                  setIsEdit(true);
                }}
              />
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default FlashcardContent;

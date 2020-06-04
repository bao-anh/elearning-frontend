import React, { FunctionComponent } from 'react';

import { Paper, Button, Typography, CircularProgress } from '@material-ui/core';
import { Lock as LockIcon, Public as PublicIcon } from '@material-ui/icons';

const EditSetHeader: FunctionComponent<{
  setState: any;
  handleSubmit: any;
  isSubmit: any;
  setIsSubmit: any;
}> = ({ setState, handleSubmit, isSubmit, setIsSubmit }) => {
  return (
    <Paper className='edit-set-header-container'>
      <div className='edit-set-header-left-panel-border'>
        <div className='edit-set-header-left-panel'>
          <div className='edit-set-header-content-left'>
            <div className='edit-set-header-content-left-title'>
              {setState.name}
            </div>
            <div className='edit-set-header-content-left-subtitle'>
              <div style={{ marginRight: '5px' }}>Được tạo bởi</div>
              <Typography color='primary' style={{ marginRight: '5px' }}>
                {setState.ownerId.name}
              </Typography>
              {setState.visiable ? (
                <PublicIcon fontSize='small' />
              ) : (
                <LockIcon fontSize='small' />
              )}
            </div>
          </div>
          <div className='edit-set-header-right-image'>
            {setState.imageURL ? (
              <img
                src={setState.imageURL}
                alt='set'
                className='edit-set-header-content-image'
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className='edit-set-header-right-panel'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            handleSubmit();
            setIsSubmit(true);
          }}
          disabled={isSubmit}
        >
          {isSubmit ? (
            <CircularProgress color='primary' size={22} />
          ) : (
            'Hoàn tất'
          )}
        </Button>
      </div>
    </Paper>
  );
};

export default EditSetHeader;

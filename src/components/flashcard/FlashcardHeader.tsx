import React, { FunctionComponent, useState } from 'react';
import AddSetDialog from './AddSetDialog';

import { Paper, Button } from '@material-ui/core';

const FlashcardHeader: FunctionComponent<{
  setState: any;
  addSet: any;
  onError: any;
}> = ({ setState, addSet, onError }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <Paper elevation={1} className='flash-card-header-container'>
      <AddSetDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        addSet={addSet}
        onError={onError}
      />
      <h3 className='flash-card-header-title'>{`Bạn có tổng cộng ${setState.data.length} học phần`}</h3>
      <Button variant='outlined' color='primary'>
        Học tất cả các học phần
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginLeft: '10px' }}
        onClick={() => setIsOpenDialog(true)}
      >
        Thêm học phần mới
      </Button>
    </Paper>
  );
};

export default FlashcardHeader;

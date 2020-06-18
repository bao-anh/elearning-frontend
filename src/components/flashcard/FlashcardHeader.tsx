import React, { FunctionComponent } from 'react';
import { Paper, Button } from '@material-ui/core';

const FlashcardHeader: FunctionComponent<{
  setState: any;
  setIsAdd: any;
}> = ({ setState, setIsAdd }) => {
  return (
    <Paper elevation={1} className='flash-card-header-container'>
      <h3 className='flash-card-header-title'>{`Bạn có tổng cộng ${setState.data.length} học phần`}</h3>
      <Button variant='outlined' color='primary'>
        Học tất cả các học phần
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginLeft: '10px' }}
        onClick={() => setIsAdd(true)}
      >
        Thêm học phần mới
      </Button>
    </Paper>
  );
};

export default FlashcardHeader;

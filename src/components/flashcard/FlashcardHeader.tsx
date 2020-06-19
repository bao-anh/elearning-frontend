import React, { FunctionComponent, useState } from 'react';
import { getSetIdFromURL } from '../../utils';

import { Paper, Button, Menu, Input } from '@material-ui/core';
import {
  Search as SearchIcon,
  FilterNone as FilterNoneIcon,
} from '@material-ui/icons';

const FlashcardHeader: FunctionComponent<{
  searchSetById: Function;
  onWarning: any;
  onSuccess: any;
  setState: any;
  setIsAdd: any;
  setIsOpenStudyDialog: any;
}> = ({
  searchSetById,
  onWarning,
  onSuccess,
  setState,
  setIsAdd,
  setIsOpenStudyDialog,
}) => {
  const [searchInfo, setSearchInfo] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchSet = () => {
    const setId = getSetIdFromURL(searchInfo);
    searchSetById(setId, onWarning, onSuccess);
    handleClose();
  };

  return (
    <Paper elevation={1} className='flash-card-header-container'>
      <h3 className='flash-card-header-title'>{`Bạn có tổng cộng ${setState.data.length} học phần`}</h3>
      <Button
        aria-controls='paste-set-link'
        aria-haspopup='true'
        onClick={handleClick}
        color='primary'
      >
        <div className='flex-center'>
          <FilterNoneIcon color='primary' style={{ marginRight: '5px' }} />
          Dán link học phần
        </div>
      </Button>
      <Menu
        id='paste-set-link'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className='flex-center padding-10'>
          <Input
            placeholder='Tìm kiếm học phần'
            inputProps={{ 'aria-label': 'description' }}
            value={searchInfo}
            onChange={(e) => setSearchInfo(e.target.value)}
          />
          <SearchIcon
            color='primary'
            className='flash-card-header-search'
            onClick={handleSearchSet}
          />
        </div>
      </Menu>
      <Button
        variant='outlined'
        color='primary'
        onClick={() => setIsOpenStudyDialog(true)}
        style={{ marginLeft: '5px' }}
      >
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

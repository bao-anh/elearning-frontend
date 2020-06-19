import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Slide, Dialog, IconButton, Button } from '@material-ui/core';
import {
  Cancel as CancelIcon,
  RotateLeft as RotateLeftIcon,
  MenuBook as MenuBookIcon,
  Hearing as HearingIcon,
} from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const StudySetDialog: FunctionComponent<{
  isOpenStudyDialog: any;
  setIsOpenStudyDialog: any;
}> = ({ isOpenStudyDialog, setIsOpenStudyDialog }) => {
  return (
    <React.Fragment>
      <Dialog
        open={isOpenStudyDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setIsOpenStudyDialog(false)}
      >
        <div className='assigment-dialog-header'>
          <div className='assigment-dialog-header-title'>
            Học tất cả học phần
          </div>
          <IconButton
            className='assigment-dialog-close-icon'
            onClick={() => setIsOpenStudyDialog(false)}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <div className='study-set-dialog-container flex-center'>
          <Link
            to='/set/all/study'
            className='none-decorated-link study-set-dialog-item'
          >
            <Button
              variant='outlined'
              color='primary'
              style={{ display: 'block', width: '100%' }}
            >
              <RotateLeftIcon color='primary' elevation={2} fontSize='large' />
              <div>Học thẻ bài</div>
            </Button>
          </Link>
          <Link
            to='/set/all/write'
            className='none-decorated-link study-set-dialog-item'
          >
            <Button
              variant='outlined'
              color='primary'
              style={{ display: 'block', width: '100%' }}
            >
              <MenuBookIcon color='primary' elevation={2} fontSize='large' />
              <div>Luyện viết</div>
            </Button>
          </Link>
          <Link
            to='/set/all/listen'
            className='none-decorated-link study-set-dialog-item'
          >
            <Button
              variant='outlined'
              color='primary'
              style={{ display: 'block', width: '100%' }}
            >
              <HearingIcon color='primary' elevation={2} fontSize='large' />
              <div>Luyện nghe</div>
            </Button>
          </Link>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default StudySetDialog;

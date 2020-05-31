import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const ToeicWarningDialog: FunctionComponent<{
  authState: any;
}> = ({ authState }) => {
  const handleOpenDialog = () => {
    if (!authState.toeicId) return true;
    else return false;
  };

  return (
    <div>
      <Dialog
        open={handleOpenDialog()}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {'Bạn chưa đặt điểm mục tiêu ?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Bạn chưa đặt điểm mục tiêu nên tạm thời chưa thể thực hiện bài thi,
            vui lòng quay lại trang luyện thi TOEIC.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='contained'>
            <Link
              to='/toeic'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Quay lại trang luyện thi TOEIC
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ToeicWarningDialog;

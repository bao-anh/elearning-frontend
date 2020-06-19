import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../../routes';

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

const PermissionDialog: FunctionComponent<{}> = ({}) => {
  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {'Bạn không có quyền truy cập!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Bạn chưa có quyền truy cập trang này, xin hãy liên hệ với chủ học
            phần để lấy link hoặc ban quản trị để biết thông tin chi tiết.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='contained'>
            <Link
              to='/flashcard'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Quay lại trang học từ vựng
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PermissionDialog;

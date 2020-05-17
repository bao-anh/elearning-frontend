import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Close as IconClose } from '@material-ui/icons';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { showImageDialog } from '../redux/actions/appValue';
import { AppState } from '../redux/appstate';
import { AppValueState } from '../redux/reducers/appValue';

const Transition: any = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

interface DialogInfoInterface {
  title: string;
  msg: string;
  okText?: string;
  cancelText?: string;
  autoHide?: boolean;
  onConfirm?: Function;
  showDialogKey?: number;
}

export class DialogInfo implements DialogInfoInterface {
  public title: string;
  public msg: string;
  public okText?: string | undefined;
  public cancelText?: string | undefined;
  public autoHide?: boolean;
  public onConfirm?: Function;
  public showDialogKey?: number;

  constructor(props: DialogInfoInterface) {
    let {
      title,
      msg,
      okText,
      cancelText,
      autoHide = true,
      onConfirm = () => {},
      showDialogKey
    } = props;
    this.title = title;
    this.msg = msg;
    this.okText = okText;
    this.cancelText = cancelText;
    this.autoHide = autoHide;
    this.onConfirm = onConfirm;
    this.showDialogKey = showDialogKey == -1 ? -1 : new Date().getTime();
  }

  static init(): DialogInfo {
    return new DialogInfo({
      title: '',
      msg: '',
      showDialogKey: -1
    });
  }
}

const AlertDialogSlide: FunctionComponent<{ dialogInfo: DialogInfo }> = ({
  dialogInfo
}) => {
  let {
    title,
    msg,
    okText,
    cancelText,
    autoHide = true,
    showDialogKey,
    onConfirm = () => {}
  } = dialogInfo;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (showDialogKey != -1) {
      setOpen(true);
    }
  }, [showDialogKey]);

  const handleClose = () => {
    if (onConfirm) {
      onConfirm(false);
    }
    setOpen(false);
  };

  const handleAgree = () => {
    if (onConfirm) {
      onConfirm(true);
    }
    if (autoHide) {
      setOpen(false);
    }
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      {title ? (
        <DialogTitle id='alert-dialog-slide-title'>{title}</DialogTitle>
      ) : (
        ''
      )}
      {msg ? (
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {msg}
          </DialogContentText>
        </DialogContent>
      ) : (
        ''
      )}
      <DialogActions>
        {cancelText !== undefined ? (
          <Button onClick={handleClose} color='primary'>
            {cancelText ? cancelText : 'Cancel'}
          </Button>
        ) : (
          ''
        )}
        {okText !== undefined ? (
          <Button onClick={handleAgree} color='primary'>
            {okText ? okText : 'Ok'}
          </Button>
        ) : (
          ''
        )}
      </DialogActions>
    </Dialog>
  );
};

const ShowImageUI: FunctionComponent<{
  appValueState: AppValueState;
  showImageDialog: any;
}> = ({ appValueState, showImageDialog }) => {
  const [open, setOpen] = useState(false);
  // console.log("******************* appValueState ", appValueState);
  useEffect(() => {
    window.onpopstate = (e: any) => {
      console.log('back button ************** open', open);
      showImageDialog('');
    };
    if (appValueState.image && appValueState.image.length > 0) {
      setOpen(true);
    }
  }, [appValueState]);
  const handleClose = () => {
    setOpen(false);
    showImageDialog('');
  };
  let isMobile = window.innerWidth <= 500;
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <div style={{ width: isMobile ? '100%' : 500, position: 'relative' }}>
        <IconButton
          onClick={handleClose}
          aria-label='close'
          style={{ position: 'absolute', top: 0, right: '0' }}
        >
          <IconClose fontSize='small' style={{ color: 'red' }} />
        </IconButton>
        <img width='100%' src={appValueState.image} alt='' />
      </div>
    </Dialog>
  );
};

const mapDispatchToProps = {
  showImageDialog: (url: string) => showImageDialog(url)
};

const ShowImage = connect(
  (state: AppState, ownProps: any) => ({
    appValueState: state.appValueState,
    ...ownProps
  }),
  mapDispatchToProps
)(ShowImageUI);

export { AlertDialogSlide, ShowImage };

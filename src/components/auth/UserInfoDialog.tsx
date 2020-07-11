import React, { FunctionComponent, useState } from 'react';
import Loading from '../common/Loading';

import {
  Button,
  Dialog,
  Slide,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
} from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const UserInfoDialog: FunctionComponent<{
  updateUserInfo: Function;
  authState: any;
  onMessage: any;
  onError: any;
  isOpenUserInfoDialog: any;
  setIsOpenUserInfoDialog: any;
}> = ({
  updateUserInfo,
  authState,
  onMessage,
  onError,
  isOpenUserInfoDialog,
  setIsOpenUserInfoDialog,
}) => {
  const [userInfo, setUserInfo] = useState({
    email: authState.email,
    name: authState.name,
    imageURL: authState.imageURL,
    imageLocalURL: authState.imageURL,
    imageLocalFile: null,
  });
  const [error, setError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowDeleteIcon, setIsShowDeleteIcon] = useState(false);

  const handleDeleteImage = () => {
    setUserInfo({
      ...userInfo,
      imageLocalURL: '',
      imageLocalFile: null,
      imageURL: '',
    });
  };

  const handleChangeFile = (e: any) => {
    setUserInfo({
      ...userInfo,
      imageLocalURL: URL.createObjectURL(e.target.files[0]),
      imageLocalFile: e.target.files[0],
    });
  };

  const handleChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (userInfo.name === '') {
      setError('Tên không được để trống');
    } else {
      setError('');
      setIsSubmit(true);
      let formData = new FormData();
      formData.append('name', userInfo.name);
      //@ts-ignore
      formData.append('imageURL', userInfo.imageLocalFile);
      if (
        userInfo.imageURL === '' ||
        userInfo.imageLocalURL !== userInfo.imageURL
      ) {
        updateUserInfo(formData, true, onSuccess, () =>
          onError('Cập nhật thông tin thất bại')
        );
      } else {
        updateUserInfo(userInfo, false, onSuccess, () =>
          onError('Cập nhật thông tin thất bại')
        );
      }
    }
  };

  const onSuccess = () => {
    onMessage('Cập nhật thông tin thành công');
    setIsSubmit(false);
    setIsOpenUserInfoDialog(false);
  };

  return (
    <Dialog
      open={isOpenUserInfoDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setIsOpenUserInfoDialog(false)}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      {isSubmit ? (
        <div className='assignment-dialog-overlay' style={{ opacity: '0.5' }}>
          <Loading />
        </div>
      ) : null}
      <div className='assigment-dialog-header'>
        <div className='assigment-dialog-header-title'>
          Chỉnh sửa thông tin cá nhân
        </div>
        <IconButton
          className='assigment-dialog-close-icon'
          onClick={() => setIsOpenUserInfoDialog(false)}
        >
          <CancelIcon />
        </IconButton>
      </div>
      <div className='add-set-content flex-center'>
        <div style={{ width: '300px' }}>
          <div className='add-set-textfield'>
            <TextField
              label='Email'
              id='outlined-number1'
              name='email'
              value={userInfo.email}
              disabled={true}
              fullWidth
            />
          </div>
          <div className='add-set-textfield'>
            <TextField
              label='Tên'
              id='outlined-number2'
              name='name'
              value={userInfo.name}
              onChange={(e) => handleChange(e)}
              fullWidth
            />
          </div>
          {error !== '' ? (
            <Typography
              color='secondary'
              variant='body2'
              style={{ marginBottom: '10px' }}
            >
              {error}
            </Typography>
          ) : null}
        </div>
        {userInfo.imageLocalURL && userInfo.imageLocalURL !== '' ? (
          <div
            className='modify-set-image-wrap'
            onMouseEnter={() => setIsShowDeleteIcon(true)}
            onMouseLeave={() => setIsShowDeleteIcon(false)}
          >
            <img
              src={userInfo.imageLocalURL}
              height='100%'
              width='100%'
              alt='set'
            />
            <DeleteIcon
              onClick={() => handleDeleteImage()}
              className='edit-set-image-wrap-delete-icon'
              style={
                isShowDeleteIcon
                  ? { visibility: 'visible' }
                  : { visibility: 'hidden' }
              }
            />
          </div>
        ) : userInfo.imageURL ? (
          <div
            className='edit-set-image-wrap'
            onMouseEnter={() => setIsShowDeleteIcon(true)}
            onMouseLeave={() => setIsShowDeleteIcon(false)}
          >
            <img src={userInfo.imageURL} height='100%' width='100%' alt='set' />
            <DeleteIcon
              onClick={() => handleDeleteImage()}
              className='edit-set-image-wrap-delete-icon'
              style={
                isShowDeleteIcon
                  ? { visibility: 'visible' }
                  : { visibility: 'hidden' }
              }
            />
          </div>
        ) : (
          <div className='modify-set-content-item-image'>
            <input
              accept='image/*'
              id={authState._id}
              type='file'
              name='imageLocalURL'
              // @ts-ignore
              onChange={(e) => handleChangeFile(e)}
              style={{ visibility: 'hidden' }}
            />
            <label
              htmlFor={authState._id}
              className='edit-set-content-image-icon'
            >
              <ImageIcon />
              <div>Hình ảnh</div>
            </label>
          </div>
        )}
      </div>
      <div className='modify-set-dialog-wrap-button'>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          fullWidth
          disabled={isSubmit}
        >
          Chỉnh sửa
        </Button>
      </div>
    </Dialog>
  );
};

export default UserInfoDialog;

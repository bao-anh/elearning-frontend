import React, { useState, FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../redux/appstate';
import * as authAction from '../../redux/actions/auth';
import SnackBar from '../../components/SnackBar';
import '../../resources/scss/auth.scss';

import { Paper, TextField, Button, CircularProgress } from '@material-ui/core';

const RegisterPage: FunctionComponent<{
  register: Function;
  authState: any;
  history: any;
}> = ({ register, authState, history }) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    severity: '',
    message: '',
  });

  useEffect(() => {
    if (authState.isAuthenticated) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, [authState.isAuthenticated]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      setSnackBar({
        isOpen: true,
        severity: 'warning',
        message: 'Mật khẩu và Xác nhận mật khẩu không trùng khớp',
      });
    } else register(userInfo, onError);
  };

  const onError = (data: any) => {
    let message = '';
    if (data.errors) {
      data.errors.forEach((error: any) => {
        message += `${error.msg}. `;
      });
    } else message += data.msg;
    setSnackBar({
      isOpen: true,
      severity: 'error',
      message,
    });
  };

  const handleChange = (e: any) => {
    const newUserInfo = { ...userInfo, [e.target.name]: e.target.value };
    setUserInfo(newUserInfo);
  };

  const renderSnackBar = () => {
    if (snackBar.isOpen) {
      return <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />;
    } else return null;
  };

  return (
    <div className='image-container'>
      {renderSnackBar()}
      <Paper elevation={3} className='register-dialog-container'>
        <form onSubmit={onSubmit}>
          <h1 className='signin-header'>Đăng ký</h1>
          <TextField
            label='Email'
            name='email'
            variant='outlined'
            value={userInfo.email}
            fullWidth
            onChange={(e) => handleChange(e)}
            className='dialog-item'
          />
          <TextField
            label='Tên'
            name='name'
            variant='outlined'
            value={userInfo.name}
            fullWidth
            onChange={(e) => handleChange(e)}
            className='dialog-item'
          />
          <TextField
            label='Mật khẩu'
            name='password'
            variant='outlined'
            type='password'
            value={userInfo.password}
            fullWidth
            onChange={(e) => handleChange(e)}
            className='dialog-item'
          />
          <TextField
            label='Xác nhận mật khẩu'
            name='confirmPassword'
            variant='outlined'
            type='password'
            value={userInfo.confirmPassword}
            fullWidth
            onChange={(e) => handleChange(e)}
            className='dialog-item'
          />
          <div className='dialog-bottom'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='dialog-item dialog-button'
              onClick={onSubmit}
              disabled={authState.isLoading}
            >
              {authState.isLoading ? (
                <CircularProgress color='primary' size={22} />
              ) : (
                'Đăng ký'
              )}
            </Button>
            <div className='dialog-footer'>
              Bạn đã có tài khoản?{' '}
              <Link to='/signin' color='primary' className='dialog-link'>
                Đăng nhập
              </Link>
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  register: (credentials: any, onError: any) =>
    dispatch(authAction.register(credentials, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

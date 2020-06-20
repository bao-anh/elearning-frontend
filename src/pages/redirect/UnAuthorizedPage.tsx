import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { Link } from 'react-router-dom';
import '../../resources/scss/404.scss';
import { removeToken } from '../../services';
import * as authAction from '../../redux/actions/auth';

import { Button } from '@material-ui/core';

const UnAuthorizedPage: FunctionComponent<{ logout: any; history: any }> = ({
  logout,
  history,
}) => {
  const handleLogout = () => {
    removeToken();
    logout();
    history.push('/signin');
  };

  return (
    <div className='container-404'>
      <h1 className='header-404'>401</h1>
      <h3 className='content-404'>
        Bạn không có quyền truy cập trang web này!
      </h3>
      <Button color='primary' variant='contained'>
        <Link
          to='/'
          style={{ textDecoration: 'none', color: 'white' }}
          onClick={handleLogout}
        >
          Đăng xuất
        </Link>
      </Button>
    </div>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(authAction.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnAuthorizedPage);

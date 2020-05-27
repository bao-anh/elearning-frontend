import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { Link } from 'react-router-dom';
import '../../resources/scss/404.scss';

import { Button } from '@material-ui/core';

const NotFoundPage: FunctionComponent<{ authState: any }> = ({ authState }) => {
  return (
    <div className='container-404'>
      <h1 className='header-404'>404</h1>
      <h3 className='content-404'>Page not found</h3>
      <Button color='primary' variant='contained'>
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
          Quay lại trang chủ
        </Link>
      </Button>
    </div>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);

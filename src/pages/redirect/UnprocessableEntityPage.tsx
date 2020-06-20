import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { Link } from 'react-router-dom';
import '../../resources/scss/404.scss';

import { Button } from '@material-ui/core';

const UnprocessableEntityPage: FunctionComponent<{ history: any }> = ({
  history,
}) => {
  const handleRedirect = () => {
    history.push('/');
  };

  return (
    <div className='container-404'>
      <h1 className='header-404'>422</h1>
      <h3 className='content-404'>
        Hệ thống không thể thực hiện yêu cầu của bạn!
      </h3>
      <Button color='primary' variant='contained'>
        <Link
          to='/'
          style={{ textDecoration: 'none', color: 'white' }}
          onClick={handleRedirect}
        >
          Quay trở lại trang chủ
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnprocessableEntityPage);

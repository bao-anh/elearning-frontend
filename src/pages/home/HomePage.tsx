import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../redux/appstate';
import { MainWidget, FixedContainer } from '../../components/common/Widgets';
import '../../resources/scss/home.scss';
import '../../resources/scss/main.scss';

import { Button } from '@material-ui/core';

const HomePage: FunctionComponent<{ authState: any }> = ({ authState }) => {
  return (
    <MainWidget className={'home-page'}>
      <FixedContainer>
        <h1>Home page</h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link
            to='/category/all'
            style={{ textDecoration: 'none', marginBottom: '10px' }}
          >
            <Button color='primary' variant='contained'>
              Go to category page
            </Button>
          </Link>
          <Link to='/toeic' style={{ textDecoration: 'none' }}>
            <Button color='primary' variant='contained'>
              Go to toeic page
            </Button>
          </Link>
        </div>
      </FixedContainer>
    </MainWidget>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { MainWidget } from './Widgets';
import { withRouter } from 'react-router-dom';
import Header from '../auth/Header';
import AuthHeader from '../auth/AuthHeader';
import Footer from '../auth/Footer';

const Layout: FunctionComponent<{ location: any; children: any }> = ({
  location,
  children,
}) => {
  if (location.pathname === '/signin' || location.pathname === '/register') {
    return (
      <MainWidget className={'home-page'}>
        <AuthHeader />
        {children}
        <Footer />
      </MainWidget>
    );
  }
  return (
    <MainWidget className={'home-page'}>
      <Header>{children}</Header>
      <Footer />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

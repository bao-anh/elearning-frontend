import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { MainWidget } from './Widgets';
import { withRouter } from 'react-router-dom';
import CustomHeader from './CustomHeader';
import Header from './Header';
import Footer from './Footer';

const Layout: FunctionComponent<{ location: any; children: any }> = ({
  location,
  children,
}) => {
  if (location.pathname === '/signin' || location.pathname === '/register') {
    return (
      <MainWidget className={'home-page'}>
        <Header />
        {children}
        <Footer />
      </MainWidget>
    );
  }
  return (
    <MainWidget className={'home-page'}>
      <CustomHeader>{children}</CustomHeader>
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

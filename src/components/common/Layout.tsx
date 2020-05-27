import React, { FunctionComponent } from 'react';
import { MainWidget } from './Widgets';
import Header from './Header';
import Footer from './Footer';

const Layout: FunctionComponent<{ children: any }> = ({ children }) => {
  return (
    <MainWidget className={'home-page'}>
      <Header />
      {children}
      <Footer />
    </MainWidget>
  );
};

export default Layout;

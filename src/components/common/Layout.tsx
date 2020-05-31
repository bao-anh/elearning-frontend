import React, { FunctionComponent } from 'react';
import { MainWidget } from './Widgets';
import CustomHeader from './CustomHeader';
import Footer from './Footer';

const Layout: FunctionComponent<{ children: any }> = ({ children }) => {
  return (
    <MainWidget className={'home-page'}>
      <CustomHeader>{children}</CustomHeader>
      <Footer />
    </MainWidget>
  );
};

export default Layout;

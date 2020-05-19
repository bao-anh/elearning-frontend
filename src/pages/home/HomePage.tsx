import React, { FunctionComponent } from 'react';
import { MainWidget, FixedContainer } from '../../components/Widgets';
import '../../resources/scss/home.scss';
import '../../resources/scss/main.scss';

const HomePage: FunctionComponent<{}> = () => {
  return (
    <MainWidget className={'home-page'}>
      <FixedContainer>
        <h1>Home page</h1>
      </FixedContainer>
    </MainWidget>
  );
};

export default HomePage;

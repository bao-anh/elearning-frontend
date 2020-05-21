import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { MainWidget, FixedContainer } from '../../components/Widgets';
import '../../resources/scss/home.scss';
import '../../resources/scss/main.scss';

import { Button } from '@material-ui/core';

const HomePage: FunctionComponent<{}> = () => {
  return (
    <MainWidget className={'home-page'}>
      <FixedContainer>
        <h1>Home page</h1>
        <Link to='/category/all' style={{ textDecoration: 'none' }}>
          <Button color='primary' variant='contained'>
            Go to category page
          </Button>
        </Link>
      </FixedContainer>
    </MainWidget>
  );
};

export default HomePage;

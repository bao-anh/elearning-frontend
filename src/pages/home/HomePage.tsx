import React, { FunctionComponent } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../redux/appstate';
import { MainWidget, FixedContainer } from '../../components/common/Widgets';
import '../../resources/scss/home.scss';
import '../../resources/scss/main.scss';

import { Button } from '@material-ui/core';

const HomePage: FunctionComponent<{ authState: any }> = ({ authState }) => {
  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 2000, amt: 2200 },
    { name: 'Page C', uv: 500, pv: 2600, amt: 2400 },
    { name: 'Page D', uv: 200, pv: 2100, amt: 2300 },
  ];
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
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type='monotone' dataKey='uv' stroke='#8884d8' />
            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
          </LineChart>
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

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './services';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export default PrivateRoute;

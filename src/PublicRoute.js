import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './services';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getToken() ? (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PublicRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export default PublicRoute;

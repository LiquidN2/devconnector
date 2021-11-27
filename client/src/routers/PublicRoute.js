import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = props => {
  const {
    auth,
    component: Component,
    ...rest
  } = props;

  const PublicComponent = props => {
    // if is authenticated, redirect to a Private route
    if (auth.isAuthenticated) {
      return (
        <Redirect to="/" />
      );
    } else {
      // render public component
      return (
        <Component {...props} />
      );
    }
  };

  return (
    <Route {...rest} component={PublicComponent} />
  );
};


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PublicRoute);

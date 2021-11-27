import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = props => {
  const {
    auth,
    component: Component,
    ...rest
  } = props;

  const PrivateCompononet = props => {
    if (!auth.isAuthenticated) {
      return <Redirect to="/login" />
    } else {
      return <Component {...props} />
    }
  };

  return <Route {...rest} component={PrivateCompononet} />
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(PrivateRoute);
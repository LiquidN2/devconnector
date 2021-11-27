import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthPage = () => {
  return (
    <Redirect to="/login" />
  );
};

export default connect()(AuthPage);
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthNavHeader from './AuthNavHeader';
import LoginForm from './../form/LoginForm';
import Loading from './../Loading';
import ErrorNotification from './ErrorNotification';

// Load redux actions
import { userLogin, clearLoginErrors } from '../../actions/authActions';

class LoginPage extends React.Component {

  userLogin = user => {
    this.props.userLogin(user);
  };

  render() {

    const { isFetching: isFetchingAuth } = this.props.auth;
    const errors = this.props.errors;

    return (
      <section className="section-login-registration">
        <div className="form-wrapper">
          <AuthNavHeader />

          {
            isFetchingAuth ? (
              <Loading />
            ) : (
              <LoginForm onSubmit={this.userLogin} />
            )
          }

          {
            Object.keys(errors).length !== 0 ? (
              <ErrorNotification errors={errors} />
            ) : null
          }
        </div>
      </section>
    );
  }
}

LoginPage.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
  userLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors.login || {}
});

const mapDispatchToProps = { userLogin, clearLoginErrors };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
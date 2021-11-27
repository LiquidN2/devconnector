import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Load components
import ErrorNotification from './ErrorNotification';
import AuthNavHeader from './AuthNavHeader';
import RegisterForm from './../form/RegisterForm';
import Loading from './../Loading';

import { userRegister } from './../../actions/registerActions';

class RegisterPage extends React.Component {

    userRegister = newUser => {
        this.props.userRegister(newUser);
    }

    render() {

        const { isFetching: isFetchingReistration } = this.props.register;
        const errors = this.props.errors;

        return (
            <section className="section-login-registration">
                <div className="form-wrapper">

                    <AuthNavHeader />

                    {
                        isFetchingReistration ? (
                            <Loading />
                        ) : (
                            <RegisterForm onSubmit={this.userRegister}/>
                        )
                    }

                    {
                        Object.keys(errors).length !== 0 ? (
                            <ErrorNotification errors={errors} /> 
                        ) : (
                            null
                        )
                    }
                </div>
            </section>

        );
    }
}

RegisterPage.propTypes = {
    register: PropTypes.object.isRequired,
    errors: PropTypes.object,
    userRegister: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        register: state.register,
        errors: state.errors.register
    };
};

const mapDispatchToProps = { userRegister };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
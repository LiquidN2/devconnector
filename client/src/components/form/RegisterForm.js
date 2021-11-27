import React from 'react';

import { ControlledEmailInput, ControlledPasswordInput, ControlledPassword2Input, ControlledTextInput } from './ControlledInput';

class RegisterForm extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    agreetc: false
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  onSubmit = event => {
    event.preventDefault();
    const { name, email, password, password2 } = this.state;
    const newUser = { name, email, password, password2 };

    if (this.state.agreetc) {
      this.props.onSubmit(newUser);
    }
  }

  render() {

    return (
      <div className="tab-content">
        <div id="register-form">
          <div className="tab-content__heading">
            <h1>Register a New Account</h1>
          </div>
          <form className="form" onSubmit={this.onSubmit}>
            <div className="form__group">
              <ControlledTextInput
                fieldName='name'
                fieldValue={this.state.name}
                onChange={this.handleInputChange}
                placeholder='name'
              />
            </div>
            <div className="form__group">
              <ControlledEmailInput
                email={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form__group">
              <ControlledPasswordInput
                password={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form__group">
              <ControlledPassword2Input
                password2={this.state.password2}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form__group">
              <label htmlFor="agreetc" className="checkbox-container">
                Agree Terms and Conditions
                                <input type="checkbox" name="agreetc" id="agreetc" onChange={this.handleInputChange} required />
                <span className="checkbox-checkmark"></span>
              </label>
            </div>

            <div className="form__group">
              <button
                id="login"
                className="btn btn--login btn--color-primary"
              >
                Register
                            </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterForm;
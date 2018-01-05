import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import LoginField from './LoginField';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import signupFields from './signupFields';
import { connect } from 'react-redux';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderFields() {
    return _.map(signupFields, ({ label, name, type }) => {
      return (
        <Field
          key={name}
          label={label}
          type={type}
          name={name}
          component={LoginField}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
        >
          {this.renderFields()}
          <Link to="/" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return {};
  // { errorMessage: state.auth.error };
}

// export default reduxForm(
//   {
//     form: 'signup',
//     // fields: ['email', 'password', 'passwordConfirm'],
//     validate
//   },
//   mapStateToProps,
//   actions
// )(Signup);
export default reduxForm({
  form: 'signup',
  validate
})(connect(mapStateToProps, actions)(Signup));

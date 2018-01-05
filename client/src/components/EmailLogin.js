import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import LoginField from './LoginField';
import { Link } from 'react-router-dom';
import loginFields from './loginFields';
import { connect } from 'react-redux';
import * as actions from '../actions';

class EmailLogin extends Component {
  onFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
    //need to do sth to log user in
  }
  renderFields() {
    return _.map(loginFields, ({ label, name, type }) => {
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
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}>
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

export default reduxForm({
  form: 'loginForm',
  destroyOnUnmount: false
})(connect(null, actions)(EmailLogin));

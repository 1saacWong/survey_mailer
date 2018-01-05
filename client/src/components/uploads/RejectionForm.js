import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitRejection } from '../../actions';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import EntryField from '../entries/EntryField';
import HiddenField from '../entries/HiddenField';

import rejectionFields from './rejectionFields';

class RejectionForm extends Component {
  onFormSubmit(values) {
    this.props.submitRejection(values);
  }

  renderFields() {
    return _.map(rejectionFields, ({ label, name, type }) => {
      return (
        <Field
          key={name}
          label={label}
          type={type}
          name={name}
          component={EntryField}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h1>Rejection</h1>
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}>
          <Field name="user" val={this.props.user} component={HiddenField} />
          <Field
            name="upload"
            val={this.props.upload}
            component={HiddenField}
          />
          {this.renderFields()}
          <Link to="/uploads" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Reject and Discard
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // errors.recipients = validateEmails(values.recipients || '');

  _.each(rejectionFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'rejectionForm',
  destroyOnUnmount: false
})(connect(null, { submitRejection })(RejectionForm));

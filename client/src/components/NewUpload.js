import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import UploadField from './UploadField';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import uploadFields from './uploadFields';
import { withRouter } from 'react-router-dom';

class NewUpload extends Component {
  uploadFile(file) {
    this.props.fileUpload(file);
  }
  renderFields() {
    return _.map(uploadFields, ({ label, name, type }) => {
      return (
        <Field
          key={name}
          label={label}
          type={type}
          name={name}
          component={UploadField}
        />
      );
    });
  }
  render() {
    return (
      <form>
        {this.renderFields()}
        <button
          className="green white-text btn-flat right"
          onClick={() => submitSurvey(formValues, history)}
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </form>
    );
  }
}
function validate(values) {
  const errors = {};

  _.each(uploadFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}
export default reduxForm({
  validate,
  form: 'uploadForms'
})(connect(null, actions)(withRouter(NewUpload)));

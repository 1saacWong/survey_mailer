import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUpload, submitEntry } from '../../actions';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import EntryField from '../entries/EntryField';
import HiddenField from '../entries/HiddenField';
import RejectionForm from './RejectionForm';

import formFields from '../entries/formFields';

class UploadShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchUpload(id);
  }
  onFormSubmit(values) {
    this.props.submitEntry(values);
    //need to do sth to log user in
  }

  renderFields(upload) {
    return _.map(formFields, ({ label, name, type }) => {
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
    var { upload } = this.props;
    if (!upload) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>{upload.supplier}</h3>
        <img
          className=""
          src={require('../../../../../public/uploads/' + upload.image)}
        />
        <p>{upload.address}</p>
        <p>Verified: {upload.creditAwarded.toString()}</p>

        <p className="right">
          Sent on: {new Date(upload.dateSent).toLocaleDateString()}
        </p>

        <p>Product: {upload.product}</p>
        <p>Quantity: {upload.quantity}</p>
        <p>RMB: {upload.price}</p>
        <p>Image: {upload.image}</p>
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}>
          <Field name="user" val={upload._user} component={HiddenField} />
          <Field name="upload" val={upload._id} component={HiddenField} />
          {this.renderFields(upload)}
          <Link to="/uploads" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Award Credit and Save
            <i className="material-icons right">done</i>
          </button>
        </form>
        <RejectionForm user={upload._user} upload={upload._id} />
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

function mapStateToProps({ uploads }, ownProps) {
  return { upload: uploads[ownProps.match.params.id] };
}

export default reduxForm({
  validate,
  form: 'entryForm',
  destroyOnUnmount: false
})(connect(mapStateToProps, { fetchUpload, submitEntry })(UploadShow));

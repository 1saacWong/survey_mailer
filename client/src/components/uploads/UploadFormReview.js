import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const UploadFormReview = ({ onCancel, formValues, submitUpload, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    var field = formValues[name][0].name
      ? formValues[name][0].name
      : formValues[name];

    return (
      <div key={name}>
        <label>{label}</label>
        <div>{field}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        className="green white-text btn-flat right"
        onClick={() => submitUpload(formValues, history)}
      >
        Send Upload
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.uploadForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(UploadFormReview));

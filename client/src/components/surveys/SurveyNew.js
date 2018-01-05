import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import * as actions from '../../actions';

class SurveyNew extends Component {
  componentDidMount() {
    this.props.hideReview();
  }
  renderContent() {
    if (this.props.showFormReview) {
      return <SurveyFormReview onCancel={() => this.props.showReview} />;
    }
    return <SurveyForm onSurveySubmit={() => this.props.hideReview} />;
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  return { showFormReview: state };
}

export default reduxForm(
  {
    form: 'surveyForm'
  },
  mapStateToProps,
  actions
)(SurveyNew);

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import UploadForm from './UploadForm';
import UploadFormReview from './UploadFormReview';
import * as actions from '../../actions';
// import { showReview, hideReview } from '../../actions';

import { connect } from 'react-redux';

class UploadNew extends Component {
  // componentDidMount() {
  //   this.props.hideReview();
  // }

  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <UploadFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <UploadForm
        onUploadSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  return { showFormReview: state.visibility.hideReview };
}

// var config = { form: 'uploadForm' };
//
// UploadNew = reduxForm(config)(UploadNew);
// UploadNew = connect(mapStateToProps, mapStateToProps)(UploadNew);
// export default UploadNew;

// export default reduxForm(
//   {
//     form: 'uploadForm'
//   },
//   mapStateToProps,
//   actions
// )(UploadNew);

export default reduxForm({
  form: 'uploadForm'
})(connect(mapStateToProps, actions)(UploadNew));

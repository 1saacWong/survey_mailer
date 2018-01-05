import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import UploadNew from './uploads/UploadNew';
import SurveyNew from './surveys/SurveyNew';
import EmailLogin from './EmailLogin';
import ThankYou from './ThankYou';
import EmailSignup from './EmailSignup';
import CompanyShow from './CompanyShow';
import Uploads from './uploads/UploadList';
import UploadShow from './uploads/UploadShow';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/uploads/new" component={UploadNew} />
            <Route path="/uploads/list" component={Uploads} />
            <Route path="/uploads/:id" component={UploadShow} />
            <Route path="/companies/:id" component={CompanyShow} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/login" component={EmailLogin} />
            <Route path="/signup" component={EmailSignup} />
            <Route path="/thankyou" component={ThankYou} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);

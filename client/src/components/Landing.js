import Search from 'react-search';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCompanies, searchCompanies, fetchProducts } from '../actions';
import { reduxForm, Field } from 'redux-form';
import SearchField from './SearchField';
import { Link } from 'react-router-dom';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchCompanies();
    this.props.fetchProducts();
  }
  onFormSubmit(values) {
    this.props.searchCompanies(values);
  }
  renderProducts(company) {
    var products = _.map(this.props.products, function(obj) {
      if (obj._company.toString() === company._id.toString()) {
        return (
          <div key={obj._id}>
            <p>{obj.name}</p>
          </div>
        );
      }
    });
    return products;
  }
  renderCompanies() {
    if (this.props.companies.length < 1) {
      return <h3>Your Search did not yield any results. Please try again.</h3>;
    }
    return this.props.companies.map(company => {
      return (
        <Link to={`/companies/${company._id}`} key={company._id}>
          <div key={company._id} className="card darken-1">
            <div className="card-content">
              <span className="card-title">{company.name}</span>
              <p>{company.address}</p>
              {this.renderProducts(company)}
            </div>
          </div>
        </Link>
      );
    });
  }
  render() {
    var { companies } = this.props;
    if (companies.constructor != Array) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Shijia</h1>
        Never overpay again.
        <div>
          <form
            onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
          >
            <Field
              name="searchQuery"
              placeholder="Search"
              type="search"
              component={SearchField}
            />

            <button type="submit" className="teal btn-flat right white-text">
              Search
              <i className="material-icons right">done</i>
            </button>
          </form>
        </div>
        <div style={{ paddingTop: '50px' }}>{this.renderCompanies()}</div>
      </div>
    );
  }
}
function mapStateToProps({ companies, products }) {
  return { companies, products };
}
export default reduxForm({
  form: 'companySearch'
})(
  connect(mapStateToProps, { fetchCompanies, searchCompanies, fetchProducts })(
    Landing
  )
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCompany, fetchProducts, fetchPrices } from '../actions';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';

class CompanyShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCompany(id);
    this.props.fetchProducts();
  }
  handleClick(e, obj) {
    this.props.fetchPrices(obj._id);
  }
  renderAveragePrice() {
    if (this.props.infos.length > 0) {
      return (
        <p>
          Average Price for this product from this supplier:{' '}
          {this.props.infos[0].averagePrice}
        </p>
      );
    }
  }
  renderPrices() {
    if (
      this.props.infos.length > 0 &&
      this.props.infos[0]._company.toString() === this.props.match.params.id
    ) {
      var prices = _.map(this.props.infos[0].prices, price => {
        return (
          <div key={price._id}>
            <p>Quantity Ordered: {price.orderQuantity}</p>
            <p>Total Price: {price.totalPrice}</p>
            <p>Unit Price:{price.unitPrice}</p>
          </div>
        );
      });
      return (
        <div>
          <p>This average is made based on the following prices</p>
          {prices}
        </div>
      );
    }
  }
  renderProducts(company) {
    var products = _.map(this.props.products, obj => {
      if (obj._company.toString() === company._id.toString()) {
        if (
          this.props.infos.length > 0 &&
          this.props.infos[0]._id.toString() === obj._id.toString()
        )
          return (
            <div key={obj._id}>
              <p>{obj.name}</p>
            </div>
          );
        return (
          <div key={obj._id}>
            <p>{obj.name}</p>

            <button onClick={e => this.handleClick(e, obj)}>Show Price</button>
          </div>
        );
      }
    });
    return products;
  }

  render() {
    var { company } = this.props;
    if (!company) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>{company.name}</h3>
        <p>{company.address}</p>

        {this.renderAveragePrice()}
        {this.renderPrices()}
        {this.renderProducts(company)}
      </div>
    );
  }
}

function mapStateToProps({ companies, products, infos }, ownProps) {
  return { company: companies[ownProps.match.params.id], products, infos };
}

export default connect(mapStateToProps, {
  fetchCompany,
  fetchProducts,
  fetchPrices
})(CompanyShow);

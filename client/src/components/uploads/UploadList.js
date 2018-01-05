import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUploads } from '../../actions';
import { Link } from 'react-router-dom';

class UploadList extends Component {
  componentDidMount() {
    this.props.fetchUploads();
  }

  renderUploads() {
    return this.props.uploads.reverse().map(upload => {
      return (
        <Link to={`/uploads/${upload._id}`} key={upload._id}>
          <div key={upload._id} className="card darken-1">
            <div className="card-content">
              <span className="card-title">{upload.supplier}</span>
              <img
                className="card-image"
                src={require('/Users/gabrieljaeger/accelerated/react/shijia/public/uploads/' +
                  upload.image)}
              />
              <p>{upload.address}</p>
              <p>Verified: {upload.creditAwarded.toString()}</p>

              <p className="right">
                Sent on: {new Date(upload.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <p>Product: {upload.product}</p>
              <p>Quantity: {upload.quantity}</p>
              <p>RMB: {upload.price}</p>
            </div>
          </div>
        </Link>
      );
    });
  }

  render() {
    return <div>{this.renderUploads()}</div>;
  }
}

function mapStateToProps({ uploads }) {
  return { uploads };
}

export default connect(mapStateToProps, { fetchUploads })(UploadList);

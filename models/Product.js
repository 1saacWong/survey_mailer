const mongoose = require('mongoose');
const PriceSchema = require('./Price');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  _company: String,
  _upload: String,
  prices: [PriceSchema],
  averagePrice: Number
});

mongoose.model('products', productSchema);

// module.exports = productSchema;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const priceSchema = new Schema({
  unitPrice: Number,
  totalPrice: Number,
  _upload: String,
  _product: String,
  orderQuantity: Number
});

mongoose.model('prices', priceSchema);

module.exports = priceSchema;

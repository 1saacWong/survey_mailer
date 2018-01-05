const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = require('./Product');

const companySchema = new Schema({
  name: String,
  _upload: String,
  products: [ProductSchema]
});

mongoose.model('companies', companySchema);

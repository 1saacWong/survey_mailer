const mongoose = require('mongoose');
const { Schema } = mongoose;

const rejectedUploadSchema = new Schema({
  supplier: String,
  address: String,
  product: String,
  quantity: Number,
  price: Number,
  image: String,
  dateSent: Date,
  reasons: String,
  _upload: String,
  latestUpdate: Date,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  creditAwarded: { type: Boolean, default: false }
});

mongoose.model('rejections', rejectedUploadSchema);

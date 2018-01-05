const mongoose = require('mongoose');
const { Schema } = mongoose;

const uploadSchema = new Schema({
  supplier: String,
  address: String,
  product: String,
  quantity: Number,
  price: Number,
  image: String,
  dateSent: Date,
  latestUpdate: Date,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  creditAwarded: { type: Boolean, default: false },
  validated: { type: Boolean, default: false }
});

mongoose.model('uploads', uploadSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  username: String,
  password: String,
  credits: { type: Number, default: 0 },
  admin: { type: Boolean, default: false }
});

mongoose.model('users', userSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  creationDate: { type: Date, default: Date.now }
});

mongoose.model('users', userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  status: { type: String, require: true}, 
  company: { type: String, require: true},
  ticker: { type: String, require: true},
  price: { type: Number, require: true},
  share: { type: Number, require: true}
});

const Transaction = mongoose.model('User', userSchema);

module.exports = User;
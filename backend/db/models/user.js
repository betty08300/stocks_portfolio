const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Transaction = require('./transaction');

const userSchema = new Schema({
  name: { type: String, require: true}, 
  email: { type: String, require: true},
  password: { type: String, require: true},
  funds: { type: Number, require: true, default: 5000 },
  transactions: [ Transaction.schema ]
});


userSchema.statics.createAuthUser = async function(user) {
    const { password } = user; 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    return await this.create(user);
};

userSchema.statics.checkAuthUser = async function(user) {
    const existingUser = await this.findOne({ email: user.email });
    if (!existingUser) {
        return false 
    }
    const isCorrectPassword = await bcrypt.compare(user.password, existingUser.password)
    return isCorrectPassword; 
};

const User = mongoose.model('User', userSchema);


module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Transaction = require('./transaction');
const Stock = require('./stock');

const userSchema = new Schema({
  name: { type: String, require: true}, 
  email: { type: String, require: true},
  password: { type: String, require: true},
  funds: { type: Number, require: true, default: 5000 },
  transactions: [ Transaction.schema ],
  stocks: [Stock.schema]
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
        return null; 
    }
    const isCorrectPassword = await bcrypt.compare(user.password, existingUser.password)
    if (isCorrectPassword){
        return existingUser; 
    } else {
        return null; 
    }
};

userSchema.methods.buy = async function(order){
    const {company, ticker, share, price} = order; 
    if (this.funds < share * price) {
        throw Error('not enough fund to buy')
    }
    this.funds -= share * price; 
    await this.transactions.push({status:'buy', company, ticker, share, price});
    const matchStocks = this.stocks.filter(stock => {
        return stock.ticker === ticker
    });
    const match = matchStocks[0];
    if (match === undefined) {
        await this.stocks.push({company, ticker, share}); 
    } else {
        match.share += share
    }

    await this.save(); 
}

const User = mongoose.model('User', userSchema);


module.exports = User;
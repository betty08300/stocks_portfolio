const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  status: { 
        type: String,
        require: true, 
        enum: ['sell', 'buy']
    }, 
  company: { 
        type: String, 
        require: true
    },
  ticker: { 
        type: String, 
        require: true
    },
  price: { 
        type: Number, 
        require: true,
        validate:{
            validator: price => price >= 0,
            message: "can't be negative"
        }
    },
  share: { 
        type: Number, 
        require: true
    },
  transactionTime: { 
        type: Date, 
        require: true, 
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
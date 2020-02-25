const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({

  company: { 
        type: String, 
        require: true
    },
  ticker: { 
        type: String, 
        require: true
    },
  share: { 
        type: Number, 
        require: true
    },
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
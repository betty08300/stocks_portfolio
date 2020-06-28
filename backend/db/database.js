const mongoose = require('mongoose');


const connectedDatabase = async() => {
    return await mongoose.connect('mongodb://mongo:27017/stocks', {useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports = connectedDatabase; 

const express = require('express');
const Transaction = require('../db/models/transaction'); 
const dashboardRouter = express.Router();
const connectDatabase = require('../db/database');


dashboardRouter.get('/transactions', async(req, res) => {
    res.json({msg: 'history'})
});

dashboardRouter.post('/transactions', async(req, res) => {
    res.json({msg:'ehllp'})
});

dashboardRouter.get('/portfolio', async(req, res) => {
    res.json({msg: 'portfolio'})
});


// let transaction = {
//     status: 'buy',
//     company: 'Google',
//     ticker: 'GOL',
//     price: 100,
//     share: 4
//}

const testTransaction = async() => {
    await connectDatabase();
    await Transaction.collection.drop();
    await Transaction.create({
        status: 'sell',
        company: 'IBM',
        ticker: 'IBM',
        price: 200,
        share: 40
    });
}

testTransaction();


module.exports = dashboardRouter; 
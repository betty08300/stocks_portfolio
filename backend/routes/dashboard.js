const express = require('express');
const Transaction = require('../db/models/transaction'); 
const dashboardRouter = express.Router();
const connectDatabase = require('../db/database');
const { verifyToken } = require('../util/session_token');

dashboardRouter.use(async(req, res, next)=>{
    const { token } = req.cookies;
    try {
        
        await verifyToken(token)
    } catch(error) {
        console.log(error.message); 
        res
            .status(401)
            .json({ message: 'failed to authenticate' })
        return 
    }
    next();
})

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
    try {
        await Transaction.collection.drop();
    } catch (error){
        console.log(error.errmsg);
    }
    await Transaction.create({
        status: 'sell',
        company: 'IBM',
        ticker: 'IBM',
        price: 200,
        share: 40
    });
}

// testTransaction();


module.exports = dashboardRouter; 
const express = require('express'); 
const dashboardRouter = express.Router();
const connectDatabase = require('../db/database');
const { verifyToken } = require('../util/session_token');
const User = require('../db/models/user'); 

dashboardRouter.use(async(req, res, next)=>{
    const { token } = req.cookies;
    try {
        
        const payload = await verifyToken(token);
        req.userId = payload.userId;
        
        next();
    } catch(error) {
        console.log(error.message); 
        res
            .status(401)
            .json({ message: 'failed to authenticate' })
        return 
    }
})

dashboardRouter.get('/transactions', async(req, res) => {
    console.log('transactionuserId', req.userId);
    let user = await User.findById(req.userId); 
    // res.status(200).json({message: 'hello'}); 
    user = user.toObject()
    res.json({transaction: user.transactions}); 
});

dashboardRouter.post('/transactions', async(req, res) => {
    res.json({msg:'ehllp'})
});

dashboardRouter.get('/portfolio', async(req, res) => {
    res.json({msg: 'portfolio'})
});



// const testTransaction = async() => {
//     await connectDatabase();
//     try {
//         await Transaction.collection.drop();
//     } catch (error){
//         console.log(error.errmsg);
//     }
//     await Transaction.create({
//         status: 'buy',
//         company: 'IBM',
//         ticker: 'IBM',
//         price: 10,
//         share: 40
//     });
// }

// testTransaction();


module.exports = dashboardRouter; 
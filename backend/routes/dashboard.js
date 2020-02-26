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
    //console.log('transactionuserId', req.userId);
    let user = await User.findById(req.userId); 
    //res.status(200).json({message: 'hello'}); 
    user = user.toObject()
    res.json({transactions: user.transactions}); 
});

dashboardRouter.get('/portfolio', async(req, res) => {
    let user = await User.findById(req.userId); 
    user = user.toObject();
    res.json({funds: user.funds, stocks: user.stocks});
});

dashboardRouter.post('/portfolio', async(req, res) => {
    const user = await User.findById(req.userId);
    try {
        await user.buy(req.body.order);  
        res.status(200).json('buy successful');
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message}); 
    }
});












// dashboardRouter.post('/stocks', async (request, response) => {
//     const user = await User.findById(request.userId);
//     const { type, ticker, amount } = request.body;
//     if (type === 'buy') {
//       try {
//         const iexStock = await Stock.getOneByTicker(ticker);
//         await user.buyStock({
//           ticker,
//           company: iexStock.quote.companyName,
//           price: iexStock.quote.latestPrice,
//           amount
//         });
//         response
//           .status(200)
//           .json({ message: 'buy successful' });
//       } catch (error) {
//         response
//           .status(400)
//           .json({ message: error.message });
//       }
//     }
//   });






module.exports = dashboardRouter; 
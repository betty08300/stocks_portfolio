const express = require('express');
const dashboardRouter = express.Router();

dashboardRouter.get('/transactions', async(req, res) => {
    res.json({msg: 'history'})
});

dashboardRouter.post('/transactions', async(req, res) => {
    res.json({msg:'ehllp'})
});

dashboardRouter.get('/portfolio', async(req, res) => {
    res.json({msg: 'portfolio'})
});


module.exports = dashboardRouter; 
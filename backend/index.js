const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const connectDatabase = require('./db/database');
const User = require('./db/models/user');
const userRouter = require('./routes/user');
const dashboardRouter = require('./routes/dashboard');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const seed = async () => {
    const db = await connectDatabase();
    try {
        await User.collection.drop();
    } catch (error){
        console.log(error.errmsg);
    }
    const user = await User.createAuthUser({name:'Betty', email:'betty@gmail.com', password:'123456'});
     await user.transactions.push ({
        status: 'sell',
        company: 'IBM',
        ticker: 'IBM',
        price: 200,
        share: 40
    }, 
    {
        status: 'buy',
        company: 'XOM',
        ticker: 'XOM',
        price: 40,
        share: 35

    })
    console.log(user.transactions);
}

seed();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);



app.listen(port, () => console.log(`Express running on port ${port}!`));






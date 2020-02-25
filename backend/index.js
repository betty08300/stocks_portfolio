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
     await user.buy ({
        company: 'Alphabet, Inc.',
        ticker: 'GOOG',
        price: 20,
        share: 5
    });

    await user.buy ({
        company: 'Apple, Inc.',
        ticker: 'AAPL',
        price: 50,
        share: 10
    });
    await user.buy ({
        company: 'Alphabet, Inc.',
        ticker: 'GOOG',
        price: 30,
        share: 4
    });
    await user.buy ({
        company: 'Facebook, Inc.',
        ticker: 'FB',
        price: 1,
        share: 10
    })

    // console.log(user);

}

seed();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);



app.listen(port, () => console.log(`Express running on port ${port}!`));






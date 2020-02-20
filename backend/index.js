const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const connectDatabase = require('./db/database');
const User = require('./db/models/user');
const userRouter = require('./routes/user');
const dashboardRouter = require('./routes/dashboard');
const bodyParser = require('body-parser');

const seed = async () => {
    await connectDatabase()
    try {
        await User.collection.drop();
    } catch (error){
        console.log(error.errmsg);
    }
    await User.create({name:'Betty', email:'betty@gmail.com', password:'123456'});
}

seed();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);



app.listen(port, () => console.log(`Express running on port ${port}!`));






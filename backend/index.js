const express = require('express');
const cors = require('cors');
const { mongoClient } = require('./db');
const app = express();
const port = 3001;
const dbName = 'stocks_portfolio';


let db = null;

app.use(cors());

app.get('/', async(req, res) => {
    const users = await db.collection('users').find().toArray();
    res.json(users);
});

app.get('/users/:userId', async(req, res) => {
    const id = Number(req.params.userId)
    const user = await db.collection('users').findOne({id})
    res.json(user);
})

app.listen(port, () => console.log(`Express running on port ${port}!`));


// mongoClient.connect(function(err) {
//     if (err) {
//         console.log(err)
//     }

//     console.log("Mongo is connecting successfully to server");
  
//     const db = mongoClient.db(dbName);
  
//     mongoClient.close();
// });

const seed = async() => {
    const connection = await mongoClient.connect();
    db = connection.db(dbName);
    await db.dropCollection('users'); 
    await db.collection('users').insertMany([
        { id: 1,firstName:'Betty' , lastName:'Wren' , email: 'betty@gmail.com' },
        { id: 2, firstName:'Alvin' , lastName:'Zablan' , email: 'alvin@gmail.com' },
        { id: 3, firstName:'JJ' , lastName:'Rong' , email: 'jj@gmail.com' },
        { id: 4, firstName:'Anne' , lastName:'Hello' , email: 'anne@gmail.com' }
    ]);
}

seed(); 
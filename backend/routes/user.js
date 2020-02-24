const express = require('express');
const userRouter = express.Router();
const User = require('../db/models/user');
const { generateToken } = require('../util/session_token');



userRouter.post('/signup', async(req, res) => {  
    console.log(req.body)
    const user = await User.createAuthUser(req.body.user);
    console.log(user)
    const payload = { userId: user.id };
    const token = await generateToken(payload);
    res.status(200).cookie('token', token).json({message: 'success to sign up'})
});

userRouter.post('/login', async(req, res) => {
    const user = await User.checkAuthUser(req.body.user);
    if (user){
        const payload = { userId: user.id };
        const token = await generateToken(payload); 
        res.status(200).cookie('token', token).json({message: 'success to sign in'})
    } else {
        res.status(400).json({message: 'wrong email or password'})
    }
});



module.exports = userRouter; 

// const testAuth = async() => {
//     await connectDatabase();
//     await User.collection.drop();
//     await createAuthUser({
//         name: 'JJJJJJJJ',
//         email: 'abc@gmail.com',
//         password: '123'
//     });

//     const test1 = await checkAuthUser({
//         email: 'abc@gmail.com',
//         password: '1234566'
//     })
//     console.log(test1);

//     const test2 = await checkAuthUser({
//         email: 'abcder@gmail.com',
//         password: '123'
//     })

//     console.log(test2);

//     const test3 = await checkAuthUser({
//         email: 'abc@gmail.com',
//         password: '123'
//     })

//     console.log(test3);

// }
// testAuth();

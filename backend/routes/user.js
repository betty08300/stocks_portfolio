const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../db/models/user');

const createAuthUser = async(user) => {
    const { password } = user; 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    return await User.create(user);
};

const checkAuthUser = async(user) => {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
        return false 
    }
    const isCorrectPassword = await bcrypt.compare(user.password, existingUser.password)
    return isCorrectPassword; 
};

userRouter.post('/signup', async(req, res) => {  
    console.log(req.body)
    const user = await createAuthUser(req.body.user);
    console.log(user)
    res.status(200).json({message: 'success to sign up'})
});

userRouter.post('/login', async(req, res) => {
    const isAuthed = await checkAuthUser(req.body.user);
    if (isAuthed){
        res.status(200).json({message: 'success to sign in'})
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

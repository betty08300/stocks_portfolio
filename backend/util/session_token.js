const jwt = require ('jsonwebtoken');

const privateKey = '9D624FE5049D748713A6321100B57336F39C38E074AF44E5FFE8FA1155C6AE2C';


const generateToken = (payload) => {
    const threeHours = 60 * 60 * 3

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            privateKey,
            {expiresIn: threeHours},
            (error, token) => {
                if(error){
                    reject(error)
                } else {
                    resolve(token)
                }
            }
        )
    })

}

const verifyToken = (token) => {

    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            privateKey,
            (error, payload) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(payload)
                }
            }
        )

    })
}

// const test = async() => {
//     const token = await generateToken();
//     console.log(token);
//     const payload = await verifyToken(token);
//     console.log(payload);
// }

// test();

module.exports = {
    generateToken,
    verifyToken
}
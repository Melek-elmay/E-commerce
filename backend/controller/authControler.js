const User = require('../database/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res) => {
    const {name ,email, password} =  req.body; 

    // try {
    //     const hashedPassword = await bcrypt.hash(password , 8);
    //     const newUser = await User.create({
    //         name, 
    //         email,
    //         password: hashedPassword
    //     }); 
    //     res.status(201).json({
    //         message: 'User created successfully', user: newUser
    //     })
    // }

    try {
        const hashedPass = await bcrypt.hash(password, 8);
        

    }
    catch (err) {
        console.log('error signup', err)
       res.status(500).send(err)
    }

}

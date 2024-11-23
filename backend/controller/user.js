const db = require('../database/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv'); 
JWT_secret


const validatePassword = (password)=> {
    const errors = []
    const passwordChecking=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

     if(password.length < 8) {
      errors.push("Password must contain at least 8 characters.")
     }
     if(!passwordChecking.test(password)) {
       errors.push("Passord must contain at least one upper, lower one symblol")
     }
     return {
        isValid: errors.lenght ===0,
        errors: errors
     }
    }


const signup = async (req ,res) =>{

    try {
        const {
            email, 
            image,
            password, 
            name
        } = req.body

        const  hashedPassword = await bcrypt.hash(password,10)  // password 
        
        // console.log(req.body); 

        if(!email || !password || !name) {
            return res.status(400).send("Missing required fields");   // condition 
        } 

        const passwordvalidation = validatePassword(password); 
        if(!passwordvalidation.isValid) {
            return res.status(400).json({
                message: 'Password is too weak',        // condition 
                errors: passwordValidation.errors
            });
        }

        const getuser = await db.User.findOne({
            where: {
                email: email
            }
        })

        if (getuser) {
            return res.status(400).send('User already exists');
        } else {
            const user = await db.User.create({
                email: email, 
                image: image, 
                password: hashedPassword, 
                name: name
            }); 

            console.log("USer created: ", user);
            res.send(user); 
        }
    } catch (err) {
      console.log(err)
    }
};




/////////// get user image //////////////////////////////////////////
const getUserImage = async (req,res) => {
    try {
        const {id} = req.params; 
        const user = await db.User.findOne({
            where: {id: id}, 
            attributes: ['image'] // Only fetch the image field
        }); 

        if(!user) {
            return res.status(404).json({message: 'User not found '})
        }

        if(!user.image) {
            return res.status(404).json({message: 'No image found for this user'})
        }
        
        else {
            res.status(200).json({image: user.image })
        }

    }

    catch (error) {
        console.log('error fetching user image', error)
        res.status(500).json({message: 'Error fetching user image', error: error.message})
    }
};
/////////// get user image //////////////////////////////////////////





//::////////////// getting all users//////////////////
const findAllUsers = async(req, res ) => {
    try {
     const users = await db.User.findAll()
     res.send(users)
    } catch (err){
      console.log('error findall users', err)
    }
}
//::////////////// getting all users//////////////////


//////// Login ///////////////////////////////////////////////////////////
const login = async (req, res) => {
    try {
        const {email, password} = req.body; 

        const user = await db.User.findOne({where: {email}}); 

        if(!user) {
           return res.status(404).json({message: 'User not found'})  // if the password not the same it displays an error 
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign(
            {
                id:user.id, 
                name: user.name, 
                email: user.email
            }
        ); 
        console.log('token token', token )

        return res.status(200).json({         ///// the purpose from this function is like any other function we need to return something 
                                              //// but here it will only return something after checking some conditions
            message: 'Login successful', 
            user: {
                id: user.id, 
                name: user.name, 
                email: user.email, 
                type: user.type
            },
            token 
        })

    }

    catch(error) {
      console.log(error)
      res.status(500).send(error)
    }
}

//////////////////////////////////////////////////////: Login ////////////////////

/////////////delete one //////////////////////////////////////////
const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await db.User.destroy({
            where: {id: id}
        });
    }
    catch (error) {
      res.send(error)
    }
}

////////////////////////////////////////////////delete one ////////

const updateUser = async (req,res) => {
  try {
    const {id} = req.params;
    const {email, password, name} = req.body


    const user = await db.User.update(
        {email, password, name}, 
        {where: {id}}
    );
    res.send(user)
  } catch (error) {
    res.send(error)
  }
}



module.exports = {signup, login, findAllUsers, deleteUser, updateUser, getUserImage}
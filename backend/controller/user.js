const db = require('../database/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
// const dotenv = require('dotenv'); 
JWT_secret= 'ascefbth,plnihcdxuwy'




const signup = async (req ,res) =>{
    try {
        const {
            email, 
            image,
            password, 
            userName
        } = req.body

        const  hashedPassword = await bcrypt.hash(password,8)  // password 
        
        console.log("hashedPassword", hashedPassword); 

        if(!email || !password || !userName) {
            return res.status(400).send("Missing required fields");   // condition 
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
                userName: userName
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
const findOneUSer = async(req, res ) => {
    try {
        const {id} = req.body; 

        const user = await db.User.findOne({where: {id}}); 
        res.send(user)
    } catch (err){
      console.log('error find one user', err)
    }
}
//::////////////// getting all users//////////////////



//////// Login ///////////////////////////////////////////////////////////
const login = async (req, res) => {
    try {
        const {email, password} = req.body; 
console.log(req.body);

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
                userName: user.userName, 
                email: user.email
            },"f54e6c702681f74f1f8f23c17188d540dd078c0ab0767099641f673c507c8c50390a204583840f3deee1eb88790e631873d1be78b9c7b1203c9a85e2cae7c53eea54858690b5e43996c8c07cf6c967f0d0c9bc1f9ad7cc73295e380cc83e31319ce0f3a5433386d645b2f68496dbb00b261887f11518736a38a692ee84596b2827ce187acf4fa210b831eb3a629d7047228cf5385c0ace19f2dbe15208f78972c33e87e60859c890c05bd82cb81d0c7ebe96deb37a900f00d413ca5d765d5700e8fc02ef6a1adaae4497d72ded0e9f88591b89d5e18bbc86ee703933e8434b3115430476202cd00201ebb0a70b8b53ca398067445069ad51ff32be2fc3368edc"
        ); 
        console.log('token token', token )

        return res.status(200).json({         ///// the purpose from this function is like any other function we need to return something 
                                              //// but here it will only return something after checking some conditions
            message: 'Login successful', 
            user: {
                id: user.id, 
                userName: user.userName, 
                email: user.email, 
                image : user.image
            },
            token:token 
        })

    }

    catch(error) {
      console.log(error)
      res.status(500).send(error)
    }
}

//////////////////////////////////////////////////////: Login ////////////////////

/////////////delete one /////////////////////////////////////////////////////////
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



///// upadate ///////////////////////////////////////////////
const updateUser = async (req,res) => {
  try {
    const {id} = req.params;
    const {email, password, userName} = req.body


    const user = await db.User.update(
        {email, password, userName}, 
        {where: {id}}
    );
    res.send(user)
  } catch (error) {
    res.send(error)
  }
}

///// upadate ///////////////////////////////////////////////


module.exports = {signup, login, findOneUSer, deleteUser, updateUser, getUserImage}
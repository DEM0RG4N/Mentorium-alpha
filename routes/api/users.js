const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

const keys = require('../../config/keys');

//api route: 
// routes/api/users/register
router.post('/register', async (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    try {
        //awaiting to find User in MongoDB
        user = await User.findOne({ email: req.body.email })

        //if exist return status 400 to client
        if(user){
            return res.status(400).json({ emailRegistered: "This email is already taken by someone."});
        }

        //else:
        //generate salt and hash according to the password taken from client
        salt = await bcrypt.genSalt(10)
        hash = await bcrypt.hash(req.body.password, salt)
        
        //create object with paramterers taken from client and hashed value as its password
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        //save to Mongo
        user = await newUser.save();
        
        //return auth token
        //create payload
        const payload = {
            id: user.id,
            username: user.username
        }
        //create token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 60*60*24*7*12 }, (err, token) => {
            res.json({
                success: true,
                token: "Bearer " + token
            });
        });   
        

    } catch( err ){
        console.log(err);
        return res.status(500);
    }
    
});

router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const userEmail = req.body.email;
    const password = req.body.password;

    User.findOne({ email: userEmail })
        .then(user => {
            if(!user){
                return res.status(400).json({ emailNotFound: "Email not found"})
            }

            //check if the password is correct
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch){
                    //user matched
                    const payload = {
                        id: user.id,
                        username: user.username
                    }

                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 60*60*24*7*12 }, (err, token) => {
                        return res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });   
                }

                res.status(400).json({ passwordIncorrect: "Password is wrong" });
                
            });


            
        });
});

module.exports = router;
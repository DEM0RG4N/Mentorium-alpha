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
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email} )
        .then(user => {
            if(user){
                return res.status(400).json({ msg: 'Email already taken by someone' })
            } else {
                let newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });
                });
            }


        })
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
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    });   
                } else {
                    res.status(400).json({ passwordIncorrect: "Password Cyka bleat" });
                }
            })
        })
})

module.exports = router;
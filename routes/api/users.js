const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//get the user model
const User = require('../../models/User');

//@route  POST api/users
//@desc   Register user
//@access Public
router.post('/', 
    [
        //validation
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Enter a valid E-mail').isEmail(),
        check('password', 'please enter a password with 6 or more charecters').isLength({min: 6})
    ],
    async (req, res) => {
        //get the validation errors if any
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json( {'errors' : errors.array() } );
        }

        const { name, email, password } = req.body;

        try{
            //check if the user exists
            let user = await User.findOne({ email });

            if(user){
                return res.status(400).json({ errors : [{ msg : "user exists!" }] })
            }

            //create a gravatar with options
            const avatar = gravatar.url(email, {
                s: '200', //size
                r: 'pg', //rating
                d: 'mm' //default
            });

            //return jsonWebToken
            user = new User({
                name,
                email,
                avatar,
                password
            });

            //Encrypt the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            //Send a Json Web token(JWT) with the user Id
            let payload = {
                user:{
                    id: user.id
                }
            }
            jwt.sign(payload, 
                config.get('jwtToken'), 
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({token})
                }
            );
        }
        catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;
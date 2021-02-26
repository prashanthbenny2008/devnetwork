const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//@route  GET api/auth
//@desc   Test route
//@access Public
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

//@route  POST api/auth
//@desc   Authenticate user and get token
//@access Public
router.post('/', 
    [
        //validation checks
        check('email', 'Enter a valid E-mail').isEmail(),
        check('password', 'Password is required').exists()
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

            if(!user){
                return res.status(400).json({ errors : [{ msg : "Invalid credentials!" }] })
            }

            //check if the password matches
            const isMatch  = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({ errors : [{ msg : "Invalid credentials!" }] })
            }

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
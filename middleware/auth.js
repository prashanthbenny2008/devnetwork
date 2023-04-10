const jwt = require('jsonwebtoken');
// const config = require('config');
const dotenv = require("dotenv");

dotenv.config();

module.exports = function( req, res, next ){  //request, response and callback function
    const token = req.header('x-auth-token');

    //check if token exists
    if(!token){
        return res.status(401).json({ msg: 'Auth failed. No token.'});
    }

    //Token verification
    try{
        let decoded = jwt.verify( token, process.env.JWT_TOKEN );
        req.user = decoded.user;
        next();
    }catch(err){
        return res.status(401).json({ msg: 'Auth failed. Invalid token.'});
    }

}
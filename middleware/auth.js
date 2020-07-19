const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function( req, res, next ){  //request, response and callback function
    const token = req.header('x-auth-token');

    //check if token exists
    if(!token){
        return res.status(401).json({ msg: 'Auth failed. No token.'});
    }

    //Token verification
    try{
        let decoded = jwt.verify(token, config.get('jwtToken'));
        req.user = jwt.decoded.user;
        next();
    }catch(err){
        return res.status(401).json({ msg: 'Auth failed. Invalid token.'});
    }

}
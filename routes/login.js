// import modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// local imports
const User = require('../models/Users.js');
const {loginValidator} = require('../authentication/formValidation.js');

// express router
const router = express.Router();

// available routes
router.route('/')
.post(async(req,res,next)=>{
    // validate incoming data with @hapi/joi validator
    const {error} = loginValidator(req.body);
    if(error) return res.status(200).send({msg:null,error:error.details[0].message});
    // checking existance of user in db 
    try{
       const user = await User.findOne({username:req.body.username});
       if(!user) return res.status(200).send({msg:null,error:"wrong username or password"});
       // compare hashed password and form password with bcyrpt
       const correctPass = await bcrypt.compare(req.body.password,user.password);
       if(!correctPass) return res.status(200).send({msg:null,error:"wrong password"});
       // creating authentication token with jsonwebtoken
       const token = await jwt.sign({u_id : user.id},process.env.JWT_TOKEN_KEY);
       return res.status(200).send({msg:{user:user.username,token:token},error:null});
    }catch(e){
      // if error connecting to db
      res.status(400).send({msg:null,error:'could not connect to db'});
    }
});

// export module
module.exports = router;
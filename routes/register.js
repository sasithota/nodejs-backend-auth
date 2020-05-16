// import modules
const express = require('express');
const bcrypt = require('bcrypt');

// local imports
const User = require('../models/Users.js');
const {Validator} = require('../authentication/formValidation.js');

// Initialize Router
const router = express.Router();

// available routes
router.route('/')
.post(async(req,res,next)=>{
	// validating incoming data
	const {error} = Validator(req.body);
	if(error) res.status(400).send({user:null,error:error.details[0].message});
	// encypting password
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(req.body.password,salt);
	// creating user instance
	const user = new User({
		username : req.body.username,
		password : hashedPass
	});
	// try inserting user into db
	try{
		const createdUser = await user.save();
		if(!createdUser)
			res.status(400).send({user:null,error:"problem connecting to db"});
		res.status(200).send({user:createdUser.username,error:null});
	}catch(e){
		// if error connecting to db or user already exist
		res.status(400).send({user:null,error:"username already exist"});
	}
})

// Export module
module.exports = router;
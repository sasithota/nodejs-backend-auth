//import modules
const mongoose = require("mongoose");

// create new Schema
var user = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	followers: {
		type: Array,
		default: [],
	},
	following: {
		type: Array,
		default: [],
	},
	profilePic: {
		type: String,
		default: "default.png",
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("users", user);

// export modules
module.exports = User;

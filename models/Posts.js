// import modules
const mongoose = require("mongoose");

// local imports
// const User = require('./Users.js');
// new Schema

const post = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	comments: {
		type: Array,
		default: [],
	},
	commentsCount: {
		type: Number,
		default: 0,
	},
	likes: {
		type: Array,
		default: [],
	},
	likesCount: {
		type: Number,
		default: 0,
	},
	author: {
		authorName: {
			type: String,
		},
		authorId: {
			type: mongoose.ObjectId,
		},
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

// schema to db
const Post = mongoose.model("posts", post);

// export module
module.exports = Post;

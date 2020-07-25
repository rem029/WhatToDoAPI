const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});


module.exports = mongoose.model("Users", userSchema, "users");
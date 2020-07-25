const mongoose = require("mongoose");

const taskListsSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	userId: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	tasks: [
		{
			title: { type: String, required: true },
			description: String,
			setTime: Boolean,
			time: String,
			isDone: Boolean,
		},
	],
});

module.exports = mongoose.model("TaskLists", taskListsSchema, "taskLists");

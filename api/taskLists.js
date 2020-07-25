const express = require("express");
const router = express.Router();

const ObjectID = require("mongodb").ObjectID;

const TaskLists = require("../models/taskLists");
const { json } = require("body-parser");
const { request } = require("express");

router.use((req, res, next) => {
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Request methods you wish to allow
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);

	// Request headers you wish to allow
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", true);

	// Pass to next layer of middleware
	next();
});

//CREATE ONE TASK BY ID
//USE HEADERS
router.put("/task/:userID/:tlID", (req, res) => {
	const query = {
		userID: Number(req.params.userID),
		id: Number(req.params.tlID),
	};

	const newTask = req.body;
	console.log(req.body);

	TaskLists.findOne(query, (err, tl) => {
		if (!err) {
			let copyTasks = tl.tasks;
			copyTasks.concat(newTask);

			TaskLists.updateOne(query, { $push: { tasks: newTask } }, (err, t) => {
				if (!err) {
					TaskLists.findOne(query, (err, tl) => {
						if (!err) {
							res.json(tl);
						}
					});
				} else {
					console.log(err);
					res.json({ title: "Error", message: err });
				}
			});
		} else {
			console.log(err);
			res.json({ title: "Error", message: err });
		}
	});
});

//READ ALL TASKSLISTS BY ID
router.get("/:userID/:tlID", (req, res) => {
	const query = {
		userID: Number(req.params.userID),
		id: Number(req.params.tlID),
	};

	TaskLists.findOne(query, (err, tl) => {
		if (!err) {
			res.json(tl);
		} else {
			console.log(err);
			res.json({ title: "Error", message: err });
		}
	});
});

//UPDATE TASK BY ID
//USE HEADERS
router.post("/task/:userID/:tlID", (req, res) => {
	const updatedTask = req.body;

	const filter = {
		userID: Number(req.params.userID),
		id: Number(req.params.tlID),
		"tasks._id": updatedTask._id,
	};

	const queryUpdate = {
		$set: {
			"tasks.$.title": updatedTask.title,
			"tasks.$.description": updatedTask.description,
			"tasks.$.setTime": updatedTask.setTime,
			"tasks.$.time": updatedTask.time,
			"tasks.$.isDone": updatedTask.isDone,
		},
	};

	TaskLists.findOneAndUpdate(filter, queryUpdate, (err, tl) => {
		if (!err) {
			TaskLists.findOne({ userID: filter.userID, id: filter.id }, (err, tl) => {
				if (!err) {
					res.json(tl);
				}
			});
		} else {
			console.log(err);
			res.json({ title: "Error", message: err });
		}
	});
});

//DELETE TASK BY ID
//USE HEADERS
router.delete("/task/:userID/:tlID", (req, res) => {
	const filter = {
		userID: Number(req.params.userID),
		id: Number(req.params.tlID),
	};

	const queryDelete = {
		$pull: { tasks: { _id: req.body._id } },
	};

	TaskLists.findOneAndUpdate(filter, queryDelete, (err, tl) => {
		if (!err) {
			TaskLists.findOne(
				{ userID: filter.userID, id: filter.id },
				(errall, tlall) => {
					if (!errall) {
						res.json(tlall);
					} else {
						console.log(errall);
						res.json({ title: "Error", message: errall });
					}
				}
			);
		} else {
			console.log(err);
			res.json({ title: "Error", message: err });
		}
	});
});

module.exports = router;

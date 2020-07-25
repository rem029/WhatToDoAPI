const express = require("express");
const router = express.Router();

const User = require("../models/users");

//READ ALL USERS
router.get("/", (req, res) => {
	User.find((err, tasks) => {
		if (!err) {
			res.json(tasks);
		} else {
			console.log(err);
		}
	});
});

router.post("/", (req, res) => {
    const newUser = new User({
        id: 0,
        name: "Kimberloo",
        password: "Kimberloo"
    })
    newUser.save((err) => {
        if (err) {
            res.status(400).json({
                "error": err,
                "message": "Error creating account"
            })
        }
    })
});

module.exports = router;

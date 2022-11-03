const User = require("../models/userModels");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		const newUser = await User.create({
			username,
			password: hashedPassword,
		});

		req.session.user = newUser;
		res.status(201).json({
			status: "signUp success",
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "signUp fail",
		});
	}
};

exports.login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(400).json({
				status: "login fail",
				message: "user not found",
			});
		}

		const isCorrect = await bcrypt.compare(password, user.password);

		if (isCorrect) {
			// store in session
			req.session.user = user;

			res.status(200).json({
				status: "login success",
			});
		} else {
			res.status(400).json({
				status: "login fail",
				message: "incorrect user or password",
			});
		}
	} catch (err) {
		res.status(400).json({
			status: err,
		});
	}
};

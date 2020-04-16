const CustomerModel = require("mongoose").model("Customer");
const sessionController = require('./session.server.controller');

const title = "Sign Up";

exports.render = (req, res, next) => {
	sessionController.get(req, res, () => {
		res.render("signup", {
			title: title,
		});
	});
	
};

exports.post = (req, res, next) => {
	function showError(err, msg = "unknown error occured") {
		console.log(err);
		res.render("signup", {
			title: title,
			error: msg,
		});
	}
	const body = req.body;

	const user = {
		username: body.username,
		password: body.password,
		accounttype: body.accounttype,
	};

	if (user.accounttype == "Patient") {
		user.patientData = [];
	}

	CustomerModel.exists({ username: user.username }, (err, result) => {
		if (err) {
			showError(err);
			return;
		}
		if (result) {
			showError(result, "Username already exists");
			return;
		}

		CustomerModel.create(user, (err, returnedUser) => {
			if (err) {
				showError(err);
				return;
			}
			console.log(returnedUser._id);
			req.session.user = returnedUser;
			if (returnedUser.accounttype == "Patient") {
				res.redirect("patient");
			} else if (returnedUser.accounttype == "Nurse") {
				res.redirect("nurse");
			}
		});
	});
};

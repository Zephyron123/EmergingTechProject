const CustomerModel = require("mongoose").model("Customer");
const sessionController = require('./session.server.controller');
const title = "Log In";

exports.render = (req, res, next) => {
	sessionController.get(req, res, () => {
		res.render("login", {
			title: title,
		});
	});
};

exports.post = (req, res) => {
	function showError(err, msg = "unknown error occured") {
		console.log(err);
		res.render("login", {
			title: title,
			error: msg
		});
	}
	const body = req.body;

	const user = {
		username: body.username,
		password: body.password
	};

	CustomerModel.findOne(user, (err, returnedUser) => {
		if (err) {
			showError(err);
			return;
		}
		console.log(returnedUser);
		if (!returnedUser) {
			showError(returnedUser, "User not found!");
			return;
		}

		req.session.user = returnedUser;

		if (returnedUser.accounttype == "Patient") {
			res.redirect("patient");
		}
		else if (returnedUser.accounttype == "Nurse") {
			res.redirect("nurse");
		}
	});
	
}

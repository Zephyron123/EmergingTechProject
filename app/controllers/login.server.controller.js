const CustomerModel = require("mongoose").model("Customer");

const title = "Log In";

exports.render = (req, res, next) => {
	res.render("login", {
		title: title,
	});
};

exports.post = (req, res) => {
	function showError(err, msg = "unknown error occured") {
		console.log(err);
		res.render("signup", {
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

/*exports.post = (req, res, next) => {
	function showError(err, msg = "unknown error occured") {
		console.log(err);
		res.render("signup", {
			title: title,
			error: msg
		});
	}
	const body = req.body;

	const user = {
		username: body.username,
		password: body.password,
		accounttype: body.accounttype
	};

	if (user.accounttype == "Patient") {
		user.patientData = [];
	}

	CustomerModel.exists({username: user.username}, (err, result) => {
		if (err) {
			showError(err);
			return;
		}
		if (result) {
			showError(result, "Username already exists");
			return;
		}

		CustomerModel.create(user, (err) => {
			if (err) {
				showError(err);
				return;
			} 
			req.session.user = user;
			if (user.accounttype == "Patient") {
				res.redirect("patient");
			}
			else if (user.accounttype == "Nurse") {
				res.redirect("nurse");
			}
		});
	});
}*/

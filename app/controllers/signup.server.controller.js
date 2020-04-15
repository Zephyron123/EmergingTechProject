const strUtils = require('../utils/string.server.utils');
const customer = require('./customer.server.controller');
const CustomerModel = require('mongoose').model('Customer');

const title = "Sign Up";

exports.render = (req, res, next) => {
    // We are currently sending user data.
    /*if (req.method == "POST") {
        const body = req.body;

        if (body.email && body.firstName && body.lastName && body.password) {
            // All the fields are filled. Create the customer.
            customer.create(req, res, next);
        } else {
            // Missing fields. Re-render the page passing an error message.
            res.render('signup', {
                error: 'Please, provide data for at least first name, last name, email, and password!',
                email: strUtils.getSafe(body.email),
                firstName: strUtils.getSafe(body.firstName),
                lastName: strUtils.getSafe(body.lastName),
                password: strUtils.getSafe(body.password),
                motherTongue: strUtils.getSafe(body.motherTongue),
                favoriteLang: strUtils.getSafe(body.favoriteLang)
            });
        }
    } else {*/
        res.render('signup', {
            title: title
        });
    //}
};

function showError(err, msg = "unknown error occured") {
	console.log(err);
	res.render("signup", {
		title: title,
		error: msg
	});
}

exports.post = (req, res, next) => {
	const body = req.body;

	const user = {
		username = body.username,
		password = body.password,
		accounttype = body.accounttype
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
			showError("Username already exists");
			return;
		}

		CustomerModel.create(user, (err) => {
			if (err) {
				showError(err);
				return;
			} 
			req.session.user = user;
		});
	});
}
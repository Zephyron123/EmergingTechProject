exports.get = (req, res, next) => {
	const user = req.session.user;

	if (user) {
		if (user.accounttype == "Patient") {
			res.redirect("patient");
			return;
		} else if (user.accounttype == "Nurse") {
			res.redirect("nurse");
			return;
		}
	}
	next(req, res);
};
exports.render = (req, res, next) => {
	const user = req.session.user;

	if (user) {
		if (user.accounttype == "Patient") {
			res.redirect("patient");
		} else if (user.accounttype == "Nurse") {
			res.redirect("nurse");
		}
	}
	res.render("index", {
		title: "Main Page",
	});
};

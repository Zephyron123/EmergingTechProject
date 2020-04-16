const MotivationModel = require('mongoose').model("Motivation");

exports.report = (req, res) => {
	res.render('index', {
		title: "Report"
	});
}
exports.viewReports = (req, res) => {
	res.render('index', {
		title: "View Reports"
	});
}
exports.submitMotivation = (req, res) => {
	res.render('nurse/submitMotivation', {
		title: "Submit Motivation"
	});
}
exports.submitMotivationPost = (req, res) => {
	const motivation = {
		link: req.body.link
	};

	MotivationModel.create(motivation, (err, returnedMotivation) => {

		if (err){
			console.log(err);
		}
		res.render('nurse/submitMotivation', {
			title: "Submit Motivation",
			status: "Success! Submitted link: " + returnedMotivation.link
		});
	})
	
}
exports.render = (req, res) => {
	res.render('nurse', {
		title: "Nurse Profile"
	});
}

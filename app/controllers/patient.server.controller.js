const MotivationModel = require('mongoose').model("Motivation");

exports.emergency = (req, res) => {
	res.render('patient/emergency', {
		title: "Emergency Response"
	});
}
exports.motivation = (req, res) => {
	res.render('index', {
		title: "Motivation Video"
	});
}

exports.viewMotivation = (req, res) => {
	MotivationModel.Find({}, (err, result) => {
		console.log(result);

		res.render('patient/viewMotivation', {
			title: "Motivational Video",
			motivations: result
		});
	});
	res.render('nurse/submitMotivation', {
		title: "Submit Motivation"
	});
}
	
exports.report = (req, res) => {
	res.render('index', {
		title: "Patient Report"
	});
}
exports.diagnosis = (req, res) => {
	res.render('index', {
		title: "Diagnosis Report"
	});
}
exports.render = (req, res) => {
	res.render('patient', {
		title: "Patient Profile"
	});
}
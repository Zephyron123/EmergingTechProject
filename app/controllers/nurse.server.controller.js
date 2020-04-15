exports.report = (req, res) => {
	res.render('index', {
		title: "Emergency Response"
	});
}
exports.viewReports = (req, res) => {
	res.render('index', {
		title: "Motivation Video"
	});
}
exports.submitMotivation = (req, res) => {
	res.render('index', {
		title: "Diagnosis Report"
	});
}
exports.render = (req, res) => {
	res.render('index', {
		title: "Nurse Profile"
	});
}
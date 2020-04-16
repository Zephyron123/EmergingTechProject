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
	res.render('index', {
		title: "Submit Motivation"
	});
}
exports.render = (req, res) => {
	res.render('nurse', {
		title: "Nurse Profile"
	});
}
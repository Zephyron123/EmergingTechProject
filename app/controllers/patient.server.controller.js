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
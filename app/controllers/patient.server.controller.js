const MotivationModel = require("mongoose").model("Motivation");
const CustomerModel = require("mongoose").model("Customer");

const reportTitle = "Patient Report";

exports.emergency = (req, res) => {
	res.render("patient/emergency", {
		title: "Emergency Response",
	});
};
exports.motivation = (req, res) => {
	res.render("index", {
		title: "Motivation Video",
	});
};

exports.viewMotivation = (req, res) => {
	MotivationModel.Find({}, (err, result) => {
		console.log(result);

		res.render("patient/viewMotivation", {
			title: "Motivational Video",
			motivations: result,
		});
	});
	res.render("nurse/submitMotivation", {
		title: "Submit Motivation",
	});
};

exports.report = (req, res) => {
	res.render("patient/report", {
		title: "Patient Report",
	});
};
exports.diagnosis = (req, res) => {
	res.render("index", {
		title: "Diagnosis Report",
	});
};
exports.render = (req, res) => {
	res.render("patient", {
		title: "Patient Profile",
	});
};

exports.post = (req, res) => {
	const user = req.session.user;
	if (!user) {
		res.redirect("login");
		return;
	}

	const body = req.body;

	const patientData = {
		bodyTemp: body.bodyTemp,
		heartRate: body.heartRate,
		bloodPressure: body.bloodPressure,
		respiratoryRate: body.respiratoryRate,
		weight: body.weight,
	};

	CustomerModel.update(
		{ username: user.username },
		{ $push: { patientData: patientData } },
		(err) => {
			if (err) {
				console.log(err);
				res.render("patient/report", {
					title: reportTitle,
					error: "Could not save report",
				});
			} else {
				res.render("patient/report", {
					title: reportTitle,
					success: "Report saved successfully",
				});
			}
		}
	);
};

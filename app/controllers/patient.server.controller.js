const MotivationModel = require("mongoose").model("Motivation");
const CustomerModel = require("mongoose").model("Customer");
const PatientDataModel = require("mongoose").model("PatientData");
const hepatitisController = require('../controllers/hepatitis.server.controller');

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
exports.diagnosisGet = (req, res) => {
	res.render("patient/diagnosis", {
		title: "Diagnosis Report",
		livedie: "Please click submit to conduct diagnosis"
	});
};
exports.diagnosisPost = (req, res) => {
	const body = req.body;

	req.hepTestData = [{
		"Age": parseInt(body.Age),
        "Sex": parseInt(body.Sex),
        "Steroid": parseInt(body.Steroid),
        "Antivirals": parseInt(body.Antivirals),
        "Fatigue": parseInt(body.Fatigue),
        "Malaise": parseInt(body.Malaise),
        "Anorexia": parseInt(body.Anorexia),
        "Liver_big": parseInt(body.Liver_big),
        "Liver_firm": parseInt(body.Liver_firm),
        "Spleen_palpable": parseInt(body.Spleen_palpable),
        "Spiders": parseInt(body.Spiders),
        "Ascites": parseInt(body.Ascites),
        "Varices": parseInt(body.Varices),
        "Bilurubin": parseInt(body.Bilurubin),
        "Alk_phosphate": parseInt(body.Alk_phosphate),
        "Sgot": parseInt(body.Sgot),
        "Albumin": parseInt(body.Albumin),
        "Protime": parseInt(body.Protime),
        "Histology": parseInt(body.Histology)
	}];

	hepatitisController.trainAndPredict(req, res, (req, res) => {
		res.render("patient/diagnosis", {
			title: "Diagnosis Report",
			livedie: "Your chance of contracting hepatitis is: " + res.hepResult.arraySync()[0][0] * 100 + "%"
		})
	});
}
exports.render = (req, res) => {
	res.render("patient", {
		title: "Patient Profile",
	});
};

exports.reportGet = (req, res) => {
	res.render("patient/report", {
		title: "Patient Report",
	});
};

exports.reportPost = (req, res) => {
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
		userID: user._id
	};

	console.log(user._id);

	PatientDataModel.create(patientData, (err, returnedPatientData) => {
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
	});
};

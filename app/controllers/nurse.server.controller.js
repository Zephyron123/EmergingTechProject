const MotivationModel = require("mongoose").model("Motivation");
const PatientDataModel = require("mongoose").model("PatientData");
const CustomerModel = require("mongoose").model("Customer");

const viewReportsTitle = "View Reports";

exports.report = (req, res) => {
	res.render("index", {
		title: "Report",
	});
};
exports.viewReportsGet = (req, res) => {
	CustomerModel.find({ accounttype: "Patient" }, (err, customers) => {
		if (err) {
			console.log(err);
		}

		req.session.patients = customers;
		console.log(customers);

		res.render("nurse/viewReports", {
			title: viewReportsTitle,
			patients: customers
		});
	});
};

exports.viewReportsPost = (req, res) => {
	const patients = req.session.patients;
	if (!patients) {
		console.log("No patients");
		patients = [];
	}

	let patientFound = false;

	const patientUsername = req.body.patientUsername;

	patients.forEach((patient) => {
		if (patient.username = patientUsername) {
			PatientDataModel.find({ userId: patient._Id }, (err, patientData) => {
				const reports = [];

				patientData.forEach(data => {
					reports.push({
						createdAt: data.createdAt,
						bodyTemp: data.bodyTemp,
						heartRate: data.heartRate,
						bloodPressure: data.bloodPressure,
						respiratoryRate: data.respiratoryRate,
						weight: data.weight
					});
				})

				res.render("nurse/viewReports", {
					title: viewReportsTitle,
					patients: patients,
					reports: reports,
				});
			});
			patientFound = true;
			return;
		}
	});
};

exports.submitMotivation = (req, res) => {
	res.render("nurse/submitMotivation", {
		title: "Submit Motivation",
	});
};
exports.submitMotivationPost = (req, res) => {
	const motivation = {
		link: req.body.link,
	};

	MotivationModel.create(motivation, (err, returnedMotivation) => {
		if (err) {
			console.log(err);
		}
		res.render("nurse/submitMotivation", {
			title: "Submit Motivation",
			status: "Success! Submitted link: " + returnedMotivation.link,
		});
	});
};
exports.render = (req, res) => {
	res.render("nurse", {
		title: "Nurse Profile",
	});
};

// CustomerModel.find([], (err, customers) => {

// });

// exports.listAllPatientUsernames = (req, res) => {

// }

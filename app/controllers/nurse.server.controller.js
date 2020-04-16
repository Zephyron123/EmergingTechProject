const MotivationModel = require("mongoose").model("Motivation");
const PatientDataModel = require("mongoose").model("PatientData");
const CustomerModel = require("mongoose").model("Customer");

const viewReportsTitle = "View Reports";
const newReport = "New Patient Report"

exports.reportGet = (req, res) => {
	CustomerModel.find({ accounttype: "Patient" }, (err, customers) => {
		if (err) {
			console.log(err);
		}

		req.session.patients = customers;
		console.log(customers);

		res.render("nurse/report", {
			title: viewReportsTitle,
			patients: customers
		});
	});
};

exports.reportPost = (req, res) => {
	const patients = req.session.patients;
	if (!patients) {
		console.log("no patients")
		patients = [];
	}

	const body = req.body;

	const patientId = body.patientId;

	console.log("Hi fuck this", patientId);

	const patientData = {
		bodyTemp: body.bodyTemp,
		heartRate: body.heartRate,
		bloodPressure: body.bloodPressure,
		respiratoryRate: body.respiratoryRate,
		weight: body.weight,
		userID: patientId
	};

	PatientDataModel.create(patientData, (err, returnedPatientData) => {
		if (err) {
			console.log(err);
			res.render("nurse/report", {
				title: newReport,
				patients: patients,
				error: "Could not save report",
			});
		} else {
			res.render("nurse/report", {
				title: newReport,
				patients: patients,
				success: "Report saved successfully",
			});
		}
	});
}

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
		if (patient.username == patientUsername) {
			console.log(patient.username, patientUsername, patient._id);

			PatientDataModel.find({ userID: patient._id }, (err, patientData) => {
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

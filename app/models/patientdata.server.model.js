// Loads the mongoose module and Schema object.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the Customer schema.
const PatientDataSchema = new mongoose.Schema({
	bodyTemp: Number,
	heartRate: Number,
	bloodPressure: Number,
	respiratoryRate: Number,
	weight: Number,
	userID: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
});

// Creates the customer model.
mongoose.model('PatientData', PatientDataSchema);
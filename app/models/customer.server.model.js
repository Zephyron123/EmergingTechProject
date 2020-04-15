// Loads the mongoose module and Schema object.
const mongoose = require('mongoose');

// Defines the Customer schema.
const CustomerSchema = new mongoose.Schema({
    username: String,
    password: String,
    accounttype: {
		type: String,
		enum: ['Patient', 'Nurse']
	},
	patientData: [{
		type: Schema.Types.ObjectId,
		ref: "PatientData"
	}]
});

// Creates the customer model.
mongoose.model('Customer', CustomerSchema);
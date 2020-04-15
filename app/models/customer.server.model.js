// Loads the mongoose module and Schema object.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
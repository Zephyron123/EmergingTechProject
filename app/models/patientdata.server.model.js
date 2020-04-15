// Loads the mongoose module and Schema object.
const mongoose = require('mongoose');

// Defines the Customer schema.
const CustomerSchema = new mongoose.Schema({
    bodyTemp: Number,
    heartRate: Number,
    bloodPressure: Number,
    respiratoryRate: Number,
    weight: Number
});

// Creates the customer model.
mongoose.model('Patient', PatientSchema);
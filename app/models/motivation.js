// Loads the mongoose module and Schema object.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the Customer schema.
const MotivationSchema = new mongoose.Schema({
	link:String,
});

// Creates the customer model.
mongoose.model('Motivation', MotivationSchema);
// Loads the mongoose module and Schema object.
const mongoose = require('mongoose');

// Defines the Customer schema.
const CustomerSchema = new mongoose.Schema({
    username: String,
    password: String,
    accountType: {
        type: String,
        enum: ["Patient", "Nurse"]
    }
});

// Creates the customer model.
mongoose.model('Customer', CustomerSchema);
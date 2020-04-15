// Loads the mongoose module and Schema object.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the Customer schema.
const CustomerSchema = new Schema({
    username: String,
    password: String,
    accountType: {
        type: String,
        enum: ["Patient", "Nurse"]
    },
    patientData: [{
        type: Schema.Type.ObjectId,
        ref: "PatientData"
    }]
});

// Creates the customer model.
mongoose.model('User', UserSchema);
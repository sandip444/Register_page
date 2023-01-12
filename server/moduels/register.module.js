const mongoose = require("mongoose");
// mongoose.connect('mongodb+srv://Sandip001:Sandip001@@cluster.mongodb.net/register', { useNewUrlParser: true, useUnifiedTopology: true });

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    mobile: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    image: {
        data: Buffer, 
        contentType: String
    },
}, {
    timestamps: true
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;

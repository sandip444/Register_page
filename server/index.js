const express = require('express')
const app = express()
const cors = require("cors");
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer')
const fs = require('fs')

// import models
const Registration = require('./models/register.module');
// Start the server
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.set('strictQuery', false);
DB = "mongodb+srv://<username>:<password>@cluster0.z3ghgqp.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("MongoDB is connected!!")
}).catch((err)=>{
    console.log("MongoDB not connected")
})


// Use middleware
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });


app.get('/', function (req, res) {
    res.send('Hello World')
})


// Register a new user
app.post('/registrations', upload.single('image'), async (req, res) => {
    try {
        const registration = new Registration({
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            image: 
            {
                data: fs.readFileSync(path.join(__dirname + '/upload/' + req.file.filename)),
                contentType : 'image/png'
            }
        });
        await registration.save();
        res.status(201).send(registration);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

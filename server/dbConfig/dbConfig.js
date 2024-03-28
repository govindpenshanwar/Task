const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri)
    .then(() => {
        console.log("DB Connected");
    }).catch((e) => {
        console.error("Error connecting Db => ", e);
    })
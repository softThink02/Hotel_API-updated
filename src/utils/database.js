const mongoose = require('mongoose');
const { DATABASE } = require("./constants")

const connectDB = cb => {
    console.log('connecting to DB...')
    mongoose.set('strictQuery', true);
    mongoose.connect(DATABASE.MONGO_URI)
    .then(connection => {
        console.log('connected to DB!')
        cb()
    }).catch(err => {
        console.log(err)
    })
}

module.exports = connectDB;
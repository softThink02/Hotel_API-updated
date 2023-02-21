require('dotenv/config');

const DATABASE = {
    MONGO_URI: process.env.MONGO_URI
}

const SCHEMAS = {
    ROOM_SCHEMA: 'room',
    Room_Type: "roomtype",
    USER_SCHEMA: "user",
}

module.exports = { DATABASE, SCHEMAS }
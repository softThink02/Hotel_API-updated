const express = require('express');
const router = express.Router();

const isAuthenticated = require("../middleware/authenticator")
const isAuthorized = require("../middleware/authorizer")
const RoomControllers = require('../controllers/room.controller');

// route for getting all room types from the database
router.get('/room-types', RoomControllers.getRoomTypes)

// route for creating room types
router.post('/room-types', isAuthenticated, isAuthorized, RoomControllers.postRoomTypes)

// route for adding a room to the database
router.post('/rooms', isAuthenticated, isAuthorized, RoomControllers.AddRoom)

// route for fetching all rooms from the database
router.get('/rooms', RoomControllers.GetAllRooms)

// route for editing a room in the database
router.patch('/rooms/:roomId', isAuthenticated, isAuthorized, RoomControllers.EditRoom)

// route for deleting a room from the database
router.delete('/rooms/:roomId', isAuthenticated, isAuthorized, RoomControllers.DeleteRoom)

// route for fetching a sinhgle room from the database
router.get('/rooms/:roomId', RoomControllers.GetOneRoom)

module.exports = router;
const RoomHelpers = require("../utils/room.handlers");
const searcher = require("./search.controller");

exports.getRoomTypes = async (req, res, next) => {
  try {
    const allRoomTypes = await RoomHelpers.allRoomTypes();
    res.status(200).json({
      data: allRoomTypes,
    });
  } catch (err) {
    next(err);
  }
};

exports.postRoomTypes = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newRoomtype = await RoomHelpers.createRoomType({ name });
    res.status(200).json({
      message: "Room type created successfully.",
      data: newRoomtype,
    });
  } catch (err) {
    next(err);
  }
};

exports.AddRoom = async (req, res, next) => {
  const { name, price, roomType } = req.body;

  try {
    // Check to see if the body's contents are not empty
    if (name === "" || price === "") {
      throw new Error("name and price must not be empty!");
    }

    const newRoom = await RoomHelpers.createRoom({
      name,
      price,
      roomType,
    });
    newRoom &&
      res
        .status(200)
        .json({ message: "Room successfully created.", data: newRoom._doc });
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

exports.EditRoom = async (req, res, next) => {
  const { roomId } = req.params;
  const { name, price, roomType } = req.body;
  try {
    if (!roomId || roomId === "") {
      throw new Error("parameter `roomId` is required!");
    }
    if (!(name && price && roomType) || name === "" || price === "") {
      throw new Error("name and price must not be empty!");
    }

    const editedRoom = await RoomHelpers.editRoom(roomId, {
      name,
      price,
      roomType,
    });
    editedRoom &&
      res
        .status(200)
        .json({ message: "Room successfully edited.", data: editedRoom._doc });
  } catch (err) {
    next(err);
  }
};

exports.DeleteRoom = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    if (!roomId || roomId === "") {
      throw new Error("parameter `roomId` is required!");
    }
    const deleteFeedBack = await RoomHelpers.deleteRoom(roomId);
    deleteFeedBack &&
      res.status(200).json({ message: "Room successfully deleted." });
  } catch (err) {
    next(err);
  }
};

exports.GetOneRoom = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    if (!roomId || roomId === "") {
      throw new Error("parameter `roomId` is required!");
    }
    const roomInfo = await RoomHelpers.findRoom(roomId);
    roomInfo && res.status(200).json({ data: roomInfo });
  } catch (err) {
    next(err);
  }
};

exports.GetAllRooms = async (req, res, next) => {
  try {
    const rooms = await searcher.getFilteredRooms(req.query)
    // const rooms = await RoomHelpers.getAllRooms();
    rooms && res.status(200).json({ data: rooms });
  } catch (err) {
    next(err);
  }
};

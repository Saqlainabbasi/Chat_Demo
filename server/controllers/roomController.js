const Rooms = require("../models/roomModel");

module.exports.getRooms = async (req, res, next) => {
  try {
    // const rooms = await Rooms.find({}).sort({ updatedAt: 1 });
    //find the rooms from the database
    //populate the users array with the user details
    const rooms = await Rooms.find({}).populate("users").sort({ updatedAt: 1 });

    res.json({ rooms: rooms });
  } catch (ex) {
    next(ex);
  }
};
// add new user to the room
module.exports.addUserToRoom = async (req, res, next) => {
  try {
    const { room_id, user_id } = req.body;
    const room = await Rooms.findByIdAndUpdate(
      room_id,
      {
        $push: { users: user_id },
      },
      { new: true }
    );
    if (room) {
      return res.json({ success: true, msg: "User added to the room." });
    }
    return res.json({ success: false, msg: "Failed to add user to the room." });
  } catch (ex) {
    next(ex);
  }
};

module.exports.createRoom = async (req, res, next) => {
  try {
    const { title, type, user } = req.body;
    console.log(req.body);
    const data = await Rooms.create({
      title,
      type,
      users: [user],
    });
    console.log(data);
    if (data)
      return res.json({ success: true, msg: "Room added successfully." });
    else return res.json({ msg: "Failed to add Room to the database" });
  } catch (ex) {
    next(ex);
  }
};

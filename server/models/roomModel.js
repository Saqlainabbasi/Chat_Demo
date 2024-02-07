const mongoose = require("mongoose");
const User = require("./userModel");

const RoomSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    type: {
      type: String,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rooms", RoomSchema);

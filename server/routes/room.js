const {
  createRoom,
  getRooms,
  addUserToRoom,
} = require("../controllers/roomController");
const router = require("express").Router();

router.post("/createRoom", createRoom);
router.get("/allRooms", getRooms);
router.post("/addUserToRoom", addUserToRoom);

module.exports = router;

const express = require("express");
const multer = require("multer");

const Groups = require("./groups-controller");

const validateThat = require("../middleware/validation");
const authorizeThat = require("../middleware/authorization");

const router = express.Router();

const fileFilter = function(req, file, cb) {
  const allowedTypes = ["application/pdf"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }

  cb(null, true);
};

const MAX_SIZE = 10000000;
const upload = multer({
  dest: "./uploads/",
  fileFilter,
  limits: {
    fileSize: MAX_SIZE,
  },
});

/**
 * View Groups by all
 *
 * @name GET /api/groups
 *
 * @return {rooms[]} - list of all stored Groups if author is not given, else list of stored Rooms with given author
 * */
router.get("/all", async (req, res) => {
  const groups = await Groups.findAll();
  res
    .status(200)
    .json(groups)
    .end();
});

router.get("/getGroup/:group_name?", async (req, res) => {
  const group = await Groups.findOne(req.params.group_name);
  res
    .status(200)
    .json(group)
    .end();
});

router.get("/getRoom/:group_name?/:room_name?", async (req, res) => {
  const group = await Groups.findOne(req.params.group_name);
  const room = group.rooms[req.params.room_name];
  res
    .status(200)
    .json(room)
    .end();
});

router.get("/downloadLatest/:group_name?/:room_name?", async (req, res) => {
  const latest_file = await Groups.findLatestFile(
    req.params.group_name,
    req.params.room_name
  );
  res
    .status(200)
    .json(latest_file)
    .end();
});

/**
 * Create a group (must signed in first)
 *
 * @name POST /api/groups
 *
 * @param {string} userID - authorID (req.session.userID)
 * @param {string} content - content of freet
 * @return {room} - the posted freet
 * @throws {401} - if the user is not logged in
 * @throws {400} - if content is not filled
 * */
router.post(
  "/create",
  [authorizeThat.signedIn],
  upload.array("files"),
  async (req, res) => {
    // router.post("/create", [authorizeThat.signedIn], async (req, res) => {
    let creator =
      req.session.username == undefined ? "anonymous" : req.session.username;
    console.log(req.files[0]);
    const group = await Groups.addOne(
      req.body.group_name,
      req.body.members_num,
      req.body.members,
      req.files,
      creator
    );
    if (group !== false) {
      res
        .status(201)
        .json(group)
        .end();
    }
  }
);

/**
 * Delete a room (must login).
 *
 * @name DELETE /api/groups/:id?
 *
 * @param {string} id - freetID (req.query.id)
 * @return {200} - freet has been deleted
 * @throws {401} - if the user is not logged in
 * @throws {400} - if freetID is not filled
 * @throws {404} - if the freet is not found
 * @throws {401} - if the freet's authorID does not match the userID in the current session
 */
router.delete("/:group_name?", [authorizeThat.signedIn], async (req, res) => {
  // return the updated freet list created by the current account to show the success of deletion
  const group = await Groups.deleteOne(req.params.group_name);
  res
    .status(200)
    .json(group)
    .end();
});

module.exports = router;

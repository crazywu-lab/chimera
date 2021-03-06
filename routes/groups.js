const express = require("express");
const multer = require("multer");

// const aws = require("aws-sdk");
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const bucketName = process.env.BUCKET;
const region = process.env.REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.ACCESS_SECRET;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

function uploadPDF(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

const now = Date.now();

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

router.get("/getGroupByUser/:username?", async (req, res) => {
  const group = await Groups.findOneByUser(req.params.username);
  res
    .status(200)
    .json(group)
    .end();
});

router.get("/getRoomByUser/:username?", async (req, res) => {
  const group = await Groups.findOneByUser(req.params.username);
  const rooms = group.rooms.filter(
    (room) => room.currentReader == req.params.username
  );
  const room = rooms[rooms.length - 1];
  res
    .status(200)
    .json(room)
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
  const fileKey = latest_file.filename;
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  const readStream = s3.getObject(downloadParams).createReadStream();
  readStream.pipe(res);
});

router.get("/downloadPDF/:group_name?/:room_name?/:index?", async (req, res) => {
  const latest_file = await Groups.findPDF(
    req.params.group_name,
    req.params.room_name,
    req.params.index
  );
  const fileKey = latest_file.filename;
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  const readStream = s3.getObject(downloadParams).createReadStream();
  readStream.pipe(res);
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
  // upload.single("file"),
  async (req, res) => {
    // router.post("/create", [authorizeThat.signedIn], async (req, res) => {

    // const result = await uploadPDF(req.file);
    // await unlinkFile(file.path);
    // console.log(result);

    for (let i = 0; i < req.files.length; i++) {
      await uploadPDF(req.files[i]);
      await unlinkFile(req.files[i].path);
    }

    let creator =
      req.session.username == undefined ? "anonymous" : req.session.username;
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

router.put(
  "/rotate/:group_name?",
  [authorizeThat.signedIn],
  async (req, res) => {
    const group = await Groups.rotation(req.params.group_name);
    console.log(group);
    res
      .status(200)
      .json(group)
      .end();
  }
);

router.put(
  "/uploadAnnotatedText/:group_name?/:room_name?",
  [authorizeThat.signedIn],
  upload.single("file"),
  async (req, res) => {
    await uploadPDF(req.file);
    console.log(req.file);
    await unlinkFile(req.file.path);
    const group = await Groups.uploadAnnotatedText(
      req.params.group_name,
      req.params.room_name,
      req.body.creator,
      req.file
    );
    res
      .status(200)
      .json(group)
      .end();
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

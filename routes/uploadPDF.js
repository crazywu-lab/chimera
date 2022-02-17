const express = require("express");
const multer = require("multer");

const Rooms = require("./rooms-controller");

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

router.post("/uploadPDF", upload.single("file"), (req, res) => {
  console.log(req.body);
  Rooms.addItem(req.file, req.body.room_name);
  res.status(200).json({ file: req.file });
});

router.use(function(err, req, res, next) {
  if (err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "Only pdf files are allowed" });
    return;
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    res
      .status(422)
      .json({ error: `Too large. Max size is ${MAX_SIZE / 1000000} Mb` });
    return;
  }
});

module.exports = router;

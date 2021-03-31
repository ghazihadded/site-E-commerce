const express = require("express"),
  multer = require("multer"),
  { v4: uuidv4 } = require("uuid");
router = express.Router();

uuidv4();

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// Image model
let Image = require("../models/Image");

router.post(
  "/user-profile",
  upload.single("profileImg"),
  async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const image = new Image({
      profileImg: url + "/public/" + req.file.filename,
    });
    await image
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User registered successfully!",
          imgCreated: {
            profileImg: result.profileImg,
          },
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  }
);

router.get("/", (req, res, next) => {
  Image.find().then((data) => {
    res.status(200).json({
      message: "User list retrieved successfully!",
      images: data,
    });
  });
});

module.exports = router;

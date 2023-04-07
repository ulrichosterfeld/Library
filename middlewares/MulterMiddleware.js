const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
const Book = require('../models/book')
const path = require("path")
const uploadPath = path.join('public', Book.coverImageBasePath)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    //cb(null, file.originalname)
    cb(null, `${uuidv4()}_${path.extname(file.originalname)}`)
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"]
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

const uploadMiddleware = multer({ storage, fileFilter })

module.exports = uploadMiddleware
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'products/'); // Saving images in 'products' folder
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + file.originalname; // Unique filename for each upload
    cb(null, fileName);
  }
});

const productUpload = multer({ storage: storage });

module.exports = productUpload;

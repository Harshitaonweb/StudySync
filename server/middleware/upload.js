const multer = require('multer');

const ALLOWED_TYPES = ['application/pdf', 'video/mp4', 'text/plain', 'application/zip'];
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});

module.exports = upload;

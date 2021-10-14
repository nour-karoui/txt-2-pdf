const createError  = require('http-errors');
const multer  = require('multer');
const storage  = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "text/plain") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new createError('Only .txt format allowed!'));
        }
    }
}).single('file');

module.exports = {
    upload
}

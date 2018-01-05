const multer = require('multer');

module.exports = app => {
  var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
      debugger;
      callback(null, './Images');
    },
    filename: function(req, file, callback) {
      callback(
        null,
        file.fieldname + '_' + Date.now() + '_' + file.originalname
      );
    }
  });

  var upload = multer({
    storage: Storage
  }).array('imgUploader', 3);
};

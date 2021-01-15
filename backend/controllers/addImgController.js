const UserImage = require("../models/UserImages");

module.exports = {
    addNewImage: function (id_user, imageUrl,callback) {
        var newData = new UserImage({ id_user, imageUrl });
        newData.save(function (err, data) {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, data);
        });
      },
      loadAllImages: function (id_user, callback) {
        UserImage.find({ id_user: id_user }, function (err, result) {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, result);
        });
      },
      removeImage: function (id_data, callback) {
        UserImage.remove({ _id: id_data }, function (err, result) {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, result);
        });
      },
}
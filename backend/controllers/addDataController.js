const Profile = require("../models/Profile");
const startOfDay = require("date-fns/startOfDay");
const endOfDay = require("date-fns/endOfDay");

module.exports = {
  addNewData: function (id_user, distance, raceTime, raceDate, callback) {
    var newData = new Profile({ id_user, distance, raceTime, raceDate });
    newData.save(function (err, data) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, data);
    });
  },

  removeData: function (id_data, callback) {
    Profile.remove({ _id: id_data }, function (err, result) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  },

  loadAllUserData: function (id_user, callback) {
    Profile.find({ id_user: id_user }, function (err, result) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  },

  updateData: function (id_data, distance, raceTime, raceDate, callback) {
    Profile.updateOne(
      { _id: id_data },
      { distance: distance, raceTime: raceTime, raceDate: raceDate },
      { upsert: false },
      function (err, result) {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      }
    );
  },

  findWeek: function (startDay, endDay,id_user, callback) {
    console.log(startDay)
    Profile.find(
      {
        raceDate: {
          $gte: startOfDay(new Date(startDay)),
          $lte: endOfDay(new Date(endDay)),
        },
        id_user:id_user,
      },
      function (err, result) {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      }
    );
  },
};

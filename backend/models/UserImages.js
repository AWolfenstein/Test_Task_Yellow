const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserImageSchema = new Schema({
  id_user: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = UserImage = mongoose.model("UserImage", UserImageSchema);

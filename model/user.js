const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, default: null },
  username: { type: String, default: null },
  password: { type: String, default: null },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);

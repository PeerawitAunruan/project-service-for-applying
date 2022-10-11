const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, default: null },
  price: { type: Number, default: null },
  picture: { type: String, default: null },
  description: { type: String, default: null },
});

module.exports = mongoose.model("service", serviceSchema);

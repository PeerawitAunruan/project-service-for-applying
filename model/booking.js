const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    service: { type: Object, default: null },
    customer: { type: Object, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);

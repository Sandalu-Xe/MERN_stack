const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the image"],
    },
    url: { type: String, required: true },
    image: { type: String, unique: true, sparse: true },
  },
  {
    timestamps: true,
  }
);

const photo = mongoose.model("photo", photoSchema);

// Use CommonJS export
module.exports = photo;

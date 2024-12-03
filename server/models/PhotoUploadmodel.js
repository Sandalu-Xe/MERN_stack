const mongoose = require("mongoose");
const schema =mongoose.schema;

const PhotoSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: [true, "Please enter your photo"]
    },

    title: {
      type: String,
      required: [true, "Please enter your photo title"],
      unique: true 
    },
  },
  
  {
    timestamps: true 
  }
);
const images = mongoose.model("Photos", PhotoSchema);
module.exports = images;


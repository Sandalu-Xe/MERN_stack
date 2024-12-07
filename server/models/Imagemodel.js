const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the image"],
    },
    fileName: {
      type: String,
      required: [true, "File name is required"],
    },
    filePath: {
      type: String,
      required: [true, "File path is required"],
    },
  },

  {
    timestamps: true, 
  }
);

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;

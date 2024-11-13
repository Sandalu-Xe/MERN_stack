const mongoose = require("mongoose");
const schema =mongoose.schema;


const PdfSchema = new mongoose.Schema(
  {
    Pdf: {
      type: String,
      required: [true, "Please enter your name"]
    },

    title: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true 
    },
  },
  
  {
    timestamps: true 
  }
);


const Pdf = mongoose.model("Pdf", PdfSchema);
module.exports = Pdf;


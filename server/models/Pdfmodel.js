const mongoose = require("mongoose");

// Define the schema
const PdfSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the PDF"],
    },
    fileName: {
      type: String,
      required: [true, "Please provide the file name"],
    },
    filePath: {
      type: String,
      required: [true, "Please provide the file path"],
    },
    uploadedAt: {
      type: Date,
      default: Date.now, // Automatically sets the current timestamp
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model
const Pdf = mongoose.model("Pdf", PdfSchema);

// Export the model
module.exports = Pdf;

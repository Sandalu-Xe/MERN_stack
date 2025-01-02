import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({

  title: { type: String, required: true },
  url: { type: String, required: true }, // URL to access the uploaded PDF
  uploadedAt: { type: Date, default: Date.now }, 

},
  { 
    timestamps: true, 
  }
);

const Pdf = mongoose.model("Pdf", pdfSchema);
export default Pdf;




// models/Pdf.js




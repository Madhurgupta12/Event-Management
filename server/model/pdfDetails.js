const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: { type: String, required: true },
    title: { type: String, required: true },
    userId: { type: String, required: true } // Add userId field
  },
  { collection: "PdfDetails" }
);

const PdfDetails = mongoose.model('PdfDetails', PdfDetailsSchema);
module.exports = PdfDetails;

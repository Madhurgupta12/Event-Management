const mongoose = require('mongoose');
const textSchema = new mongoose.Schema({
    userId: String,
    content: String,
  });
  
const TextData = mongoose.model('TextData', textSchema);
module.exports = TextData;
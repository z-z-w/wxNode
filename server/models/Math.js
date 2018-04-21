const mongoose = require('mongoose');
const MathSchema = new mongoose.Schema({
  question: {
    type: String
  },
  option: {
    type: Array,
    default: []
  },
  rightAnswer: {
    type: String
  },
  images: {
    type: Array,
    default: []
  }
});

module.exports =  mongoose.model('Math', MathSchema);
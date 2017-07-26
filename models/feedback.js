const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  user: String,
  date: Number,
  issue: String,
  suggestion: String
});

const Feedback = mongoose.model('feedback', FeedbackSchema);


module.exports = Feedback;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  username: String,
  date: Number,
  issue: String,
  suggestion: String,
  likes: String
});

const Feedback = mongoose.model('feedback', FeedbackSchema);


module.exports = Feedback;

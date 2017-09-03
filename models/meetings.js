const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  title: String,
  type: String,
  date: Number,
  location:String,
  groups: Array,
  chair: String,
  lists: Array,
  members: Array,
  minutes: Array,
  actions: Array,
  decisions:Array,
  username: String
});

const Meeting = mongoose.model('meeting', MeetingSchema);


module.exports = Meeting;

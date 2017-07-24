const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../models/users')
const Meeting = require('../models/meetings')


app.use(cors())
app.use(bodyParser.json())
// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testaroo',{
	useMongoClient: true
});

mongoose.connection.once('open',function(){
	console.log('Connection made');
}).on('error',function(error){
	console.log('Connection error',error);
});
//Clearing DB on start up
mongoose.connection.collections.users.drop(function(){
  console.log('users droppped');
});
mongoose.connection.collections.meetings.drop(function(){
  console.log('meetings droppped');
});

//Save meeting
app.post('/save', function(req,res) {
	console.log(req.body);
	var meeting = new Meeting({
		title: req.body.title,
		type: req.body.type,
		date: req.body.date,
		location:req.body.location,
		groups: req.body.groups,
		chair: req.body.chair,
		members: req.body.members,
		minutes: req.body.minutes,
		actions: req.body.actions,
		decisions: req.body.decisions
	});
	meeting.save().then(function(){
		if(meeting.isNew === false){
			console.log('Saved');
		};
	}).catch(function(err){
		console.log(err)
	});
	res.send(JSON.stringify(meeting));
})
// User Login
app.post('/login',function(req,res){
	console.log('Login')
	User.findOne({username:req.body.username, password:req.body.password}).then(function(result){
		if(result){
			res.send(JSON.stringify(result));
		} else {
			res.send('User not found');
			console.log('User not found');
		}
	}).catch(function(error){
		console.log('Error', error);
	});
})
//User Sign Up
app.post('/signup',function(req,res){
	console.log('Sign Up')
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});
	user.save().then(function(){
		if(user.isNew === false){
			console.log('Sign Up Successful');
		};
	});
	res.send(JSON.stringify(user));
})
// Repo Search
app.post('/search',function(req,res){
	console.log(req.body)
	if(req.body.searchType === 'title'){
		console.log('Title search')
		Meeting.find({ title: {$regex:req.body.search, $options: "i"}}).then(function(result){
			res.send(JSON.stringify(result))
		})
	} else if(req.body.searchType === 'members') {
		console.log('Member search')
		Meeting.find({members: {$in:[req.body.search]}}).then(function(result){
			res.send(JSON.stringify(result))
		})
	}	else if (req.body.searchType === 'date'){
		console.log('Date search')
		Meeting.find({date: {$gt:req.body.lower, $lt: req.body.upper}, username:req.body.username}).then(function(result){
			res.send(JSON.stringify(result))
		})
	} else {
		res.send("Search didn't work");
	}
})
// Server Port
app.listen(4200,function() {
	console.log('App listening on port 4200')
})

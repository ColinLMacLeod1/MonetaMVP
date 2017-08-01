const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../models/users')
const Meeting = require('../models/meetings')
const Feedback = require('../models/feedback')
const Code = require('../models/codes')
const bcrypt = require('bcrypt');


const saltRounds = 10;
const codes = ['1234','5678'];

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

//Adding Sign Up Codes
codes.map((code) => {
	var newCode = new Code({
		code: code,
		used: false
	});
	console.log(newCode)
	newCode.save().then(function(){
		if(newCode.isNew === false){
			console.log('Code Added');
		};
	});
});

// Adding test users
bcrypt.hash('macleod', saltRounds).then(function(hash){
	var user1 = new User({
		username: 'colin',
		password: hash
	});
	console.log(user1)
	user1.save().then(function(){
		if(user1.isNew === false){
			console.log('Sign Up Successful');
		};
	});
})

bcrypt.hash('litt', saltRounds).then(function(hash){
	var user2 = new User({
		username: 'andrew',
		password: hash
	});
	console.log(user2)
	user2.save().then(function(){
		if(user2.isNew === false){
			console.log('Sign Up Successful');
		};
	});
})
for(i=0;i<4;i++){
	var meeting = new Meeting({
		title: "Finalize Sgt.Peppers Lyrics",
		type: "Songwriting Meeting",
		date: (new Date()).getTime(),
		location:"Abbey Road",
		groups: ["tech", "Sales"],
		chair: "Litt",
		members: [
				"Paul",
				"John",
				"George",
				"Ringo"
			],
		minutes:  [
			"Minute test",
			"Also a test",
			"Still Testing"
		],
		actions: [{phrase: "Action Test", assigned:["Litt"], date:"ASAP"}],
		decisions: ["Decision Test","Another one"],
		username: "colinlmacleod1"
	});
	meeting.save().then(function(){
		if(meeting.isNew === false){
			console.log('Meeting Saved');
		};
	}).catch(function(err){
		console.log(err)
	});
}


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
		decisions: req.body.decisions,
		username: req.body.username
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
app.post('/login',function(req,response){
	console.log('Login Attempt')
	User.findOne({username:req.body.username}).then(function(result){
		if(result){
			bcrypt.compare(req.body.password, result.password).then(function(res){
				if(res) {
					console.log(req.body.username, 'is now Logged In')
					response.send(req.body.username)
				} else {
					console.log('User Exists')
					response.send(JSON.stringify('User Exists'));
				}
			})
		} else {
			response.send('User not found');
			console.log('User not found');
		}
	}).catch(function(error){
		console.log('Error', error);
	});
})

//User Sign Up
app.post('/signup',function(req,res){
	console.log('Sign Up Attempt')
	Code.findOne({code:req.body.code}).then(function(codeResult){
		if(codeResult){
			if(!codeResult.used){
				User.findOne({username:req.body.username}).then(function(result){
					if(!result) {
						bcrypt.hash(req.body.password, saltRounds).then(function(hash){
							const hashPass = hash;
							var user = new User({
								username: req.body.username,
								password: hash
							});
							user.save().then(function(){
								if(user.isNew === false){
									console.log('Sign Up Successful');
									//Update the Code to be used
									Code.update({ _id:codeResult._id }, { used: true }, function (err, raw) {
									  if (err) return handleError(err);
									  console.log('The raw response from Mongo was ', raw);
									});
									res.send(JSON.stringify(user.username))
								} else {
									res.send('Sign Up Unsuccessful')
								}
							}).catch(function(err){
									console.log(err);
									res.send('Sign Up Unsuccessful')
							})
						})
					} else {
						console.log('User Exists')
						res.send('User Exists')
					}
				})
			} else{
				console.log("Code Already Used")
				res.send("Code Already Used")
			}
		} else{
			console.log("Code Doesn't Exist")
			res.send("Code Doesn't Exist")
		}
	}).catch(function(err){
		console.log(err)
	})
})

// Repo Search
app.post('/search',function(req,res){
	console.log(req.body)
	if(req.body.searchType === 'title'){
		console.log('Title search')
		Meeting.find({title: {$regex:req.body.search, $options: "i"},
									username:req.body.username,
									date: { $gt: req.body.minDate, $lt: req.body.maxDate }
								}).then(function(result){
			res.send(JSON.stringify(result))
		})
	} else if(req.body.searchType === 'member') {
		console.log('Member search')
		Meeting.find({members: {$in:[req.body.search]}, username:req.body.username}).then(function(result){
			res.send(JSON.stringify(result))
		})
	}	else {
		res.send("Search didn't work");
	}
})

//Delete Meeting
app.post('/delete',function(req,res){
	console.log('Deleting')
	console.log(req.body)
	Meeting.remove({_id:req.body.id}).then(function(){
		Meeting.findOne({_id:req.body.id}).then(function(result){
			if(!result){
				console.log('Deleted')
				res.send('Deleted')
			} else {
				res.send('Delete Unsuccessful')
			}
		})

	});
})

//Save Feedback
app.post('/feedback',function(req,res){
	console.log('Sending Feedback')
	var feedback = new Feedback({
		username: req.body.username,
		date: req.body.date,
		issue: req.body.issue,
		suggestion: req.body.suggestion,
		likes: req.body.likes
	});
	feedback.save().then(function(){
		if(feedback.isNew === false){
			console.log('Feedback Saved');
		};
	});
	res.send(JSON.stringify('Feedback Saved'));
})

//Get Feedback
app.get('/feedback',function(req,res){
	console.log('Getting Feedback')
	Feedback.find({}).then(function(result){
		res.send(JSON.stringify(result))
		console.log('Feedback')
	}).catch(function(err){
		console.log(err)
	})
})


// Server Port
app.listen(4200,function() {
	console.log('App listening on port 4200')
})

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var mylocation = {city: 'Salt Lake City', state: 'Utah'};
var pastJobs = ['warrior', 'beekeeper', 'undertaker', 'apple picker', 'stormtrooper'];

app.get('/', function(req, res){
	res.send('this is home');
});
app.get('/name', function(req, res){
	res.status(200).json({
		firstName: 'Chris',
		lastName: 'Duran'
	});
});
app.get('/location', function(req, res){
	res.status(200).json(mylocation);
});
app.put('/location', function(req, res){
	mylocation = req.body;
	res.status(200).json(mylocation);
});
app.get('/hobbies', function(req, res) {
	res.status(200).json({
		hobbies: ['breathing', 'eating food', 'sleeping']
	});
});
app.get('/occupations', function(req, res) {
	if (req.query.order === 'desc') {
		res.status(200).json(pastJobs.sort().reverse());	
	} else if (req.query.order === 'asc') {
		res.status(200).json(pastJobs.sort());
	} else {
		res.status(200).json(pastJobs);
	}
});
app.get('/occupations/latest', function(req, res) {
	var lastJob = pastJobs.length - 1;
	res.status(200).json(pastJobs[lastJob]);
});
var myMentions = ['www.google.com', 'www.facebook.com', 'www.twitter.com'];

app.get('/mentions', function(req, res) {
	res.status(200).json(myMentions);
});
app.post('/mentions', function(req, res) {
	var addUrl = req.body;
	myMentions.push(addUrl);
	res.status(201).json(addUrl);
});
var myRefs = ['Darth Vader', 'The Hamburglar', 'The Ninja Turtles'];

app.get('/references', function(req, res) {
	res.json(myRefs);
});
app.post('/references', function(req, res) {
	var addRef = req.body;
	myRefs.push(addRef);
	res.status(201).json(addRef);
});
var skills = [{
	id: 1,
	name: 'Javascript',
	experience: 'Intermediate'
},
{
	id: 2,
	name: 'Getting Stuff Done',
	experience: 'Expert'
}
];
app.get('/skills', function(req, res) {
	var skillsToReturn = skills;
	if (req.query.experience) {
		skillsToReturn = skills.filter(function(skill) {
			return skill.experience === req.query.experience;
		});
	}
	res.status(200).json(skillsToReturn);
});
app.post('/skills', function(req, res) {

});


app.listen(7000);
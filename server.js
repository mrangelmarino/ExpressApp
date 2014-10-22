var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();


app.use(bodyParser.urlencoded());	

var names = [];

function log (req, res, next){
	console.log(names);
	next();	
};

app.use(function(req, res, next){
	console.log('this will log on every request');
	next();
});

app.all('/', function(req,res, next){
	console.log('from all');
	next();
});
	
app.get('/', log, function(req, res){
	res.render('index.jade', {
		names: names		
	});
});

app.post('/', function(req, res){
	names.push(req.body.name);
	res.redirect('/');
});

app.get('/route', function(req, res){
	res.send('this is a routte');	
});

app.use(express.static('./public'));

app.listen(3000, function(){
	console.log('Listening on port 3000');
}); 
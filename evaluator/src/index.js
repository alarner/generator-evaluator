let expressionEvaluator = require('./expression-evaluator');
let connect = require('connect');
let http = require('http');
let querystring = require('querystring');
let logger = require('morgan');
let app = connect();
let port = 3000;
if(process.argv.length >= 3) {
	port = parseInt(process.argv[2]);
	if(isNaN(port)) {
		console.error('You must supply a valid positive integer port as the first argument to the script');
		process.exit(1);
	}
}

app.use(logger('dev'));

app.use('/api/v1/evaluate', function(req, res) {
	if(req.method.toUpperCase() !== 'GET') {
		res.statusCode = 404;
		return res.end(`Cannot ${req.method} ${req.originalUrl}`);
	}

	let query = querystring.parse(req._parsedUrl.query);
	if(!query.hasOwnProperty('expression')) {
		res.statusCode = 400;
		return res.end('Querystring must include an expression property');
	}

	expressionEvaluator.evaluateExpression(query.expression);
	
	try {
		let calculation = expressionEvaluator.evaluateExpression(query.expression);
		res.end(calculation.toString());
	}
	catch(e) {
		res.statusCode = 400;
		return res.end(e.toString());
	}
});

console.log(`Starting up webserver on port ${port}`);

http.createServer(app).listen(port);
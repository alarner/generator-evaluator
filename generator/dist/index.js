'use strict';

var expressionGenerator = require('./expression-generator');
var url = require('url');
var request = require('request');

if (process.argv.length < 3) {
	console.error('You must supply a destination url as the first argument to the script');
	process.exit(1);
}

var evaluatorUrl = process.argv[2];
var parsedUrl = url.parse(evaluatorUrl);
var urlValid = process.argv.length >= 3;
urlValid = urlValid && parsedUrl.protocol;
var waitTime = 1000;

if (!urlValid) {
	console.error('The supplied destination url is invalid');
	process.exit(1);
}

if (process.argv.length >= 4) {
	waitTime = parseInt(process.argv[3]);
	if (isNaN(waitTime) || waitTime < 0) {
		console.error('You must supply a valid positive integer wait time as the second argument to the script');
		process.exit(1);
	}
}

function makeRequest() {

	var options = {
		url: evaluatorUrl,
		qs: {
			expression: expressionGenerator.generateExpression()
		}
	};

	request(options, onResponse);

	function onResponse(err, response, body) {
		console.log('Request:\t\t', options.qs.expression);
		if (err) {
			console.log('Response:\t', err.toString());
		} else {
			console.log('Response:\t', '[' + response.statusCode + ']\t', body);
		}
		console.log('----------------------------------------------------');
	}
};

makeRequest();
setInterval(makeRequest, waitTime);
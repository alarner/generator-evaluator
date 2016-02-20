# Generator / Evaluator Example

In this system the Generator will send a series of random arithmetic expressions, while the Evaluator will accept these expressions, compute the result and then report the solution to the Generator.

The Generator can be found in [/generator](/generator).

The Evaluator can be found in [/evaluator](/evaluator).

The code was split up into two separate projects with the intention that projects could be eventually split into their own repo's and run on separate machines. Each directory has a corresponding `test` subdirectory with mocha / chai unit tests.

## Installation

To install:

1. clone this repo
1. cd into the [/generator](/generator) directory
1. run `npm install`
1. cd into the [/evaluator](/evaluator) directory
1. run `npm install`

To run:

1. cd into the [/evaluator](/evaluator) directory
1. run `npm start` to boot up the webserver. You can optionally specify a port like `npm start 8080`. The default is port 3000.
1. cd into the [/generator](/generator) directory
1. run `npm start http://localhost:3000/api/v1/evaluate` (or whichever port you chose) to start generating and sending requests. The generator will default to sending one request every second. To specify how often to send requests you can instead run `npm start http://localhost:3000/api/v1/evaluate 500` where the last number is the number of milliseconds to wait in between requests. You can run the generator program as many times as you'd like in different terminal windows or by adding ` &` to the end of the `npm start...` command.

## Tests

To run generator or evaluator tests, cd into the appropriate directory and run `npm test`.

## UML Activity Diagram

![UML Activity Diagram](activity.png)

## UML Sequence Diagram

![UML Sequence Diagram](sequence.png)

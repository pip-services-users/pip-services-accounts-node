let AccountsLambdaFunction = require('../obj/src/container/AccountsLambdaFunction').AccountsLambdaFunction;

module.exports = new AccountsLambdaFunction().getHandler();
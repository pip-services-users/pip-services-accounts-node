"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const AccountsServiceFactory_1 = require("../build/AccountsServiceFactory");
class AccountsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("accounts", "User accounts function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-accounts', 'controller', 'default', '*', '*'));
        this._factories.add(new AccountsServiceFactory_1.AccountsServiceFactory());
    }
}
exports.AccountsLambdaFunction = AccountsLambdaFunction;
exports.handler = new AccountsLambdaFunction().getHandler();
//# sourceMappingURL=AccountsLambdaFunction.js.map
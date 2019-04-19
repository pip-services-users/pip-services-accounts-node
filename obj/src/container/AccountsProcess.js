"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const AccountsServiceFactory_1 = require("../build/AccountsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class AccountsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("accounts", "User accounts microservice");
        this._factories.add(new AccountsServiceFactory_1.AccountsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_node_1.DefaultGrpcFactory);
    }
}
exports.AccountsProcess = AccountsProcess;
//# sourceMappingURL=AccountsProcess.js.map
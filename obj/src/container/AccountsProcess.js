"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const AccountsServiceFactory_1 = require("../build/AccountsServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class AccountsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("accounts", "User accounts microservice");
        this._factories.add(new AccountsServiceFactory_1.AccountsServiceFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.AccountsProcess = AccountsProcess;
//# sourceMappingURL=AccountsProcess.js.map
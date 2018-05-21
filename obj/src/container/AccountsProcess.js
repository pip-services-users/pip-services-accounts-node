"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const AccountsServiceFactory_1 = require("../build/AccountsServiceFactory");
class AccountsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("accounts", "User accounts microservice");
        this._factories.add(new AccountsServiceFactory_1.AccountsServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.AccountsProcess = AccountsProcess;
//# sourceMappingURL=AccountsProcess.js.map
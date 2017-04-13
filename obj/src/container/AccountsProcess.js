"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const AccountsFactory_1 = require("../build/AccountsFactory");
class AccountsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("accounts", "User accounts microservice");
        this._factories.add(new AccountsFactory_1.AccountsFactory);
    }
}
exports.AccountsProcess = AccountsProcess;
//# sourceMappingURL=AccountsProcess.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const AccountsFactory_1 = require("../build/AccountsFactory");
class AccountsProcess extends pip_services_container_node_1.ProcessContainer {
    initReferences(references) {
        super.initReferences(references);
        // Factory to statically resolve Accounts components
        references.put(AccountsFactory_1.AccountsFactory.Descriptor, new AccountsFactory_1.AccountsFactory());
    }
    runWithArguments(args) {
        return this.runWithArgumentsOrConfigFile("accounts", args, "./config/config.yaml");
    }
}
exports.AccountsProcess = AccountsProcess;
//# sourceMappingURL=AccountsProcess.js.map
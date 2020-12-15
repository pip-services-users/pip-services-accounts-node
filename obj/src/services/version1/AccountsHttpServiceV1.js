"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsHttpServiceV1 = void 0;
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class AccountsHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/accounts');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-accounts', 'controller', 'default', '*', '1.0'));
    }
}
exports.AccountsHttpServiceV1 = AccountsHttpServiceV1;
//# sourceMappingURL=AccountsHttpServiceV1.js.map
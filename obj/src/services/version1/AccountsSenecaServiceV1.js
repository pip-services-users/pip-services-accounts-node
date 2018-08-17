"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class AccountsSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('accounts');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-accounts', 'controller', 'default', '*', '1.0'));
    }
}
exports.AccountsSenecaServiceV1 = AccountsSenecaServiceV1;
//# sourceMappingURL=AccountsSenecaServiceV1.js.map
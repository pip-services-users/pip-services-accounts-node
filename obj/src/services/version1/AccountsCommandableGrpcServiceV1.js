"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class AccountsCommandableGrpcServiceV1 extends pip_services3_grpc_node_1.CommandableGrpcService {
    constructor() {
        super('v1/accounts');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-accounts', 'controller', 'default', '*', '*'));
    }
}
exports.AccountsCommandableGrpcServiceV1 = AccountsCommandableGrpcServiceV1;
//# sourceMappingURL=AccountsCommandableGrpcServiceV1.js.map
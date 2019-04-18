"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/accounts_v1_grpc_pb');
let messages = require('../../../../src/protos/accounts_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const AccountGrpcConverterV1_1 = require("./AccountGrpcConverterV1");
class AccountsGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.AccountsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-accounts", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getAccounts(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let filter = pip_services3_commons_node_2.FilterParams.fromValue(call.request.filterMap);
        let paging = pip_services3_commons_node_3.PagingParams.fromValue(call.request.paging);
        this._controller.getAccounts(correlationId, filter, paging, (err, result) => {
            let error = AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromError(err);
            let page = err == null ? AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromAccountPage(result) : null;
            let response = new messages.AccountPageReply();
            response.setError(error);
            response.setPage(page);
            callback(err, response);
        });
    }
    getAccountById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let accountId = call.request.getAccountId();
        this._controller.getAccountById(correlationId, accountId, (err, result) => {
            let error = AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromError(err);
            let account = err == null ? AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromAccount(result) : null;
            let response = new messages.AccountObjectReply();
            response.setError(error);
            response.setAccount(account);
            callback(err, response);
        });
    }
    getAccountByLogin(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let login = call.request.getLogin();
        this._controller.getAccountByLogin(correlationId, login, (err, result) => {
            let error = AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromError(err);
            let account = err == null ? AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromAccount(result) : null;
            let response = new messages.AccountObjectReply();
            response.setError(error);
            if (result)
                response.setAccount(account);
            callback(err, response);
        });
    }
    getAccountByIdOrLogin(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let login = call.request.getLogin();
        this._controller.getAccountByIdOrLogin(correlationId, login, (err, result) => {
            let error = AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromError(err);
            let account = err == null ? AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromAccount(result) : null;
            let response = new messages.AccountObjectReply();
            response.setError(error);
            if (result)
                response.setAccount(account);
            callback(err, response);
        });
    }
    createAccount(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let account = AccountGrpcConverterV1_1.AccountGrpcConverterV1.toAccount(call.request.getAccount());
        this._controller.createAccount(correlationId, account, (err, result) => {
            let error = AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromError(err);
            let account = err == null ? AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromAccount(result) : null;
            let response = new messages.AccountObjectReply();
            response.setError(error);
            if (result)
                response.setAccount(account);
            callback(err, response);
        });
    }
    updateAccount(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let account = AccountGrpcConverterV1_1.AccountGrpcConverterV1.toAccount(call.request.getAccount());
        this._controller.updateAccount(correlationId, account, (err, result) => {
            let error = AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromError(err);
            let account = err == null ? AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromAccount(result) : null;
            let response = new messages.AccountObjectReply();
            response.setError(error);
            if (result)
                response.setAccount(account);
            callback(err, response);
        });
    }
    deleteAccountById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let accountId = call.request.getAccountId();
        this._controller.deleteAccountById(correlationId, accountId, (err, result) => {
            let error = AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromError(err);
            let account = err == null ? AccountGrpcConverterV1_1.AccountGrpcConverterV1.fromAccount(result) : null;
            let response = new messages.AccountObjectReply();
            response.setError(error);
            if (result)
                response.setAccount(account);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('get_accounts', null, this.getAccounts);
        this.registerMethod('get_account_by_id', null, this.getAccountById);
        this.registerMethod('get_account_by_login', null, this.getAccountByLogin);
        this.registerMethod('get_account_by_id_or_login', null, this.getAccountByIdOrLogin);
        this.registerMethod('create_account', null, this.createAccount);
        this.registerMethod('update_account', null, this.updateAccount);
        this.registerMethod('delete_account_by_id', null, this.deleteAccountById);
    }
}
exports.AccountsGrpcServiceV1 = AccountsGrpcServiceV1;
//# sourceMappingURL=AccountsGrpcServiceV1.js.map
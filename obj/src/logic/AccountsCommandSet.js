"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
class AccountsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the business logic
        this.addCommand(this.makeGetAccountsCommand());
        this.addCommand(this.makeGetAccountByIdCommand());
        this.addCommand(this.makeGetAccountByLoginCommand());
        this.addCommand(this.makeGetAccountByIdOrLoginCommand());
        this.addCommand(this.makeCreateAccountCommand());
        this.addCommand(this.makeUpdateAccountCommand());
        this.addCommand(this.makeDeleteAccountByIdCommand());
    }
    makeGetAccountsCommand() {
        return new pip_services_commons_node_2.Command("get_accounts", null, (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getAccounts(correlationId, filter, paging, callback);
        });
    }
    makeGetAccountByIdCommand() {
        return new pip_services_commons_node_2.Command("get_account_by_id", null, (correlationId, args, callback) => {
            let accountId = args.getAsNullableString("account_id");
            this._logic.getAccountById(correlationId, accountId, callback);
        });
    }
    makeGetAccountByLoginCommand() {
        return new pip_services_commons_node_2.Command("get_account_by_login", null, (correlationId, args, callback) => {
            let accountId = args.getAsNullableString("login");
            this._logic.getAccountByLogin(correlationId, accountId, callback);
        });
    }
    makeGetAccountByIdOrLoginCommand() {
        return new pip_services_commons_node_2.Command("get_account_by_id_or_login", null, (correlationId, args, callback) => {
            let idOrLogin = args.getAsNullableString("id_or_login");
            this._logic.getAccountByIdOrLogin(correlationId, idOrLogin, callback);
        });
    }
    makeCreateAccountCommand() {
        return new pip_services_commons_node_2.Command("create_account", null, (correlationId, args, callback) => {
            let account = args.get("account");
            this._logic.createAccount(correlationId, account, callback);
        });
    }
    makeUpdateAccountCommand() {
        return new pip_services_commons_node_2.Command("update_account", null, (correlationId, args, callback) => {
            let account = args.get("account");
            this._logic.updateAccount(correlationId, account, callback);
        });
    }
    makeDeleteAccountByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_account_by_id", null, (correlationId, args, callback) => {
            let accountId = args.getAsNullableString("account_id");
            this._logic.deleteAccountById(correlationId, accountId, callback);
        });
    }
}
exports.AccountsCommandSet = AccountsCommandSet;
//# sourceMappingURL=AccountsCommandSet.js.map
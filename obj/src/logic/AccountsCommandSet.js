"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const AccountV1Schema_1 = require("../data/version1/AccountV1Schema");
class AccountsCommandSet extends pip_services3_commons_node_1.CommandSet {
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
        return new pip_services3_commons_node_2.Command("get_accounts", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getAccounts(correlationId, filter, paging, callback);
        });
    }
    makeGetAccountByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_account_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('account_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let accountId = args.getAsNullableString("account_id");
            this._logic.getAccountById(correlationId, accountId, callback);
        });
    }
    makeGetAccountByLoginCommand() {
        return new pip_services3_commons_node_2.Command("get_account_by_login", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('login', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let accountId = args.getAsNullableString("login");
            this._logic.getAccountByLogin(correlationId, accountId, callback);
        });
    }
    makeGetAccountByIdOrLoginCommand() {
        return new pip_services3_commons_node_2.Command("get_account_by_id_or_login", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('id_or_login', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let idOrLogin = args.getAsNullableString("id_or_login");
            this._logic.getAccountByIdOrLogin(correlationId, idOrLogin, callback);
        });
    }
    makeCreateAccountCommand() {
        return new pip_services3_commons_node_2.Command("create_account", null, (correlationId, args, callback) => {
            let account = args.get("account");
            this._logic.createAccount(correlationId, account, callback);
        });
    }
    makeUpdateAccountCommand() {
        return new pip_services3_commons_node_2.Command("update_account", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('account', new AccountV1Schema_1.AccountV1Schema()), (correlationId, args, callback) => {
            let account = args.get("account");
            this._logic.updateAccount(correlationId, account, callback);
        });
    }
    makeDeleteAccountByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_account_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('account_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let accountId = args.getAsNullableString("account_id");
            this._logic.deleteAccountById(correlationId, accountId, callback);
        });
    }
}
exports.AccountsCommandSet = AccountsCommandSet;
//# sourceMappingURL=AccountsCommandSet.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsController = void 0;
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const AccountActivityTypeV1_1 = require("../data/version1/AccountActivityTypeV1");
const AccountsCommandSet_1 = require("./AccountsCommandSet");
const pip_clients_activities_node_1 = require("pip-clients-activities-node");
class AccountsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(AccountsController._defaultConfig);
        this._logger = new pip_services3_components_node_1.CompositeLogger();
        this._loginAsEmail = false;
    }
    configure(config) {
        config = config.setDefaults(AccountsController._defaultConfig);
        this._dependencyResolver.configure(config);
        this._loginAsEmail = config.getAsBooleanWithDefault('options.login_as_email', this._loginAsEmail);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._activitiesClient = this._dependencyResolver.getOneOptional('activities');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new AccountsCommandSet_1.AccountsCommandSet(this);
        return this._commandSet;
    }
    getAccounts(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getAccountById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    getAccountByLogin(correlationId, login, callback) {
        this._persistence.getOneByLogin(correlationId, login, callback);
    }
    getAccountByIdOrLogin(correlationId, idOrLogin, callback) {
        this._persistence.getOneByIdOrLogin(correlationId, idOrLogin, callback);
    }
    validateAccount(correlationId, account, callback) {
        if (account.name == null) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'NO_NAME', 'Missing account name'), null);
            return false;
        }
        if (this._loginAsEmail) {
            if (account.login == null) {
                callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'NO_EMAIL', 'Missing account primary email'), null);
                return false;
            }
            if (!AccountsController._emailRegex.test(account.login)) {
                callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'WRONG_EMAIL', 'Invalid account primary email ' + account.login).withDetails('login', account.login), null);
                return false;
            }
        }
        else {
            if (account.login == null) {
                callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'NO_LOGIN', 'Missing account login'), null);
                return false;
            }
        }
        return true;
    }
    logUserActivity(correlationId, account, activityType) {
        if (this._activitiesClient) {
            this._activitiesClient.logPartyActivity(correlationId, new pip_clients_activities_node_1.PartyActivityV1(null, activityType, {
                id: account.id,
                type: 'account',
                name: account.name
            }), (err, activity) => {
                if (err)
                    this._logger.error(correlationId, err, 'Failed to log user activity');
            });
        }
    }
    createAccount(correlationId, account, callback) {
        // Validate account
        if (!this.validateAccount(correlationId, account, callback))
            return;
        async.series([
            // Verify if account already registered
            (callback) => {
                this._persistence.getOneByLogin(correlationId, account.login, (err, data) => {
                    if (data) {
                        callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'ALREADY_EXIST', 'User account ' + account.login + ' already exist').withDetails('login', account.login));
                        return;
                    }
                    callback();
                });
            },
            // Create account object
            (callback) => {
                this._persistence.create(correlationId, account, (err, data) => {
                    account = data;
                    callback(err);
                });
            },
            // Log activity
            (callback) => {
                this.logUserActivity(correlationId, account, AccountActivityTypeV1_1.AccountActivityTypeV1.AccountCreated);
                callback();
            }
        ], (err) => {
            callback(err, account);
        });
    }
    updateAccount(correlationId, account, callback) {
        let oldAccount;
        // Validate account
        if (!this.validateAccount(correlationId, account, callback))
            return;
        async.series([
            // Verify if account with new login already registered
            (callback) => {
                this._persistence.getOneByLogin(correlationId, account.login, (err, data) => {
                    if (data && data.id != account.id) {
                        callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'ALREADY_EXIST', 'User account ' + account.login + ' is already exist').withDetails('login', account.login), null);
                        return;
                    }
                    if (data && data.id == account.id)
                        oldAccount = data;
                    callback();
                });
            },
            // Get the account
            (callback) => {
                if (oldAccount) {
                    callback();
                    return;
                }
                this._persistence.getOneById(correlationId, account.id, (err, data) => {
                    oldAccount = data;
                    if (oldAccount == null && err == null) {
                        err = new pip_services3_commons_node_4.NotFoundException(correlationId, 'NOT_FOUND', 'User account ' + account.id + ' was not found').withDetails('id', account.id);
                    }
                    callback(err, null);
                });
            },
            // Change name and other fields and save
            (callback) => {
                this._persistence.update(correlationId, account, (err, data) => {
                    account = data;
                    callback(err);
                });
            },
            // Log activity
            (callback) => {
                this.logUserActivity(correlationId, account, AccountActivityTypeV1_1.AccountActivityTypeV1.AccountChanged);
                callback();
            }
        ], (err) => {
            callback(err, account);
        });
    }
    deleteAccountById(correlationId, id, callback) {
        let oldAccount;
        let newAccount;
        async.series([
            // Get account
            (callback) => {
                this._persistence.getOneById(correlationId, id, (err, data) => {
                    oldAccount = data;
                    callback(err);
                });
            },
            // Set logical deletion flag
            (callback) => {
                if (oldAccount == null) {
                    callback();
                    return;
                }
                newAccount = _.clone(oldAccount);
                newAccount.deleted = true;
                this._persistence.update(correlationId, newAccount, (err, data) => {
                    newAccount = data;
                    callback(err);
                });
            },
            (callback) => {
                if (oldAccount)
                    this.logUserActivity(correlationId, oldAccount, AccountActivityTypeV1_1.AccountActivityTypeV1.AccountDeleted);
                callback();
            }
        ], (err) => {
            callback(err, err == null ? newAccount : null);
        });
    }
}
exports.AccountsController = AccountsController;
AccountsController._emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
AccountsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-accounts:persistence:*:*:1.0', 'dependencies.activities', 'pip-services3-activities:client:*:*:1.0', 'options.login_as_email', false);
//# sourceMappingURL=AccountsController.js.map
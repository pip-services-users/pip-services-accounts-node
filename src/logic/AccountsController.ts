let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { CompositeLogger } from 'pip-services3-components-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { NotFoundException } from 'pip-services3-commons-node';

import { AccountV1 } from '../data/version1/AccountV1';
import { AccountActivityTypeV1 } from '../data/version1/AccountActivityTypeV1';
import { IAccountsPersistence } from '../persistence/IAccountsPersistence';
import { IAccountsController } from './IAccountsController';
import { AccountsCommandSet } from './AccountsCommandSet';

import { PartyActivityV1 } from 'pip-clients-activities-node';
import { IActivitiesClientV1 } from 'pip-clients-activities-node';

export class AccountsController implements IConfigurable, IReferenceable, ICommandable, IAccountsController {
    private static _emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-accounts:persistence:*:*:1.0',
        'dependencies.activities', 'pip-services3-activities:client:*:*:1.0',

        'options.login_as_email', false
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(AccountsController._defaultConfig);
    private _logger: CompositeLogger = new CompositeLogger();
    private _persistence: IAccountsPersistence;
    private _commandSet: AccountsCommandSet;
    private _activitiesClient: IActivitiesClientV1;
    private _loginAsEmail: boolean = false;

    public configure(config: ConfigParams): void {
        config = config.setDefaults(AccountsController._defaultConfig);
        this._dependencyResolver.configure(config);

        this._loginAsEmail = config.getAsBooleanWithDefault('options.login_as_email', this._loginAsEmail);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IAccountsPersistence>('persistence');
        this._activitiesClient = this._dependencyResolver.getOneOptional<IActivitiesClientV1>('activities');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new AccountsCommandSet(this);
        return this._commandSet;
    }
    
    public getAccounts(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<AccountV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getAccountById(correlationId: string, id: string,
        callback: (err: any, account: AccountV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);
    }

    public getAccountByLogin(correlationId: string, login: string,
        callback: (err: any, account: AccountV1) => void): void {
        this._persistence.getOneByLogin(correlationId, login, callback);
    }

    public getAccountByIdOrLogin(correlationId: string, idOrLogin: string,
        callback: (err: any, account: AccountV1) => void): void {
        this._persistence.getOneByIdOrLogin(correlationId, idOrLogin, callback);
    }

    private validateAccount(correlationId: string, account: AccountV1,
        callback: (err: any, account: AccountV1) => void) {

        if (account.name == null) {
            callback(new BadRequestException(
                correlationId, 
                'NO_NAME', 
                'Missing account name'
            ), null);
            return false;
        }

        if (this._loginAsEmail) {
            if (account.login == null) {
                callback(new BadRequestException(
                    correlationId, 
                    'NO_EMAIL', 
                    'Missing account primary email'
                ), null);
                return false;
            }

            if (!AccountsController._emailRegex.test(account.login)) {
                callback(
                    new BadRequestException(
                        correlationId, 
                        'WRONG_EMAIL', 
                        'Invalid account primary email ' + account.login
                    ).withDetails('login', account.login),
                    null
                );
                return false;
            }
        } else {
            if (account.login == null) {
                callback(new BadRequestException(
                    correlationId, 
                    'NO_LOGIN', 
                    'Missing account login'
                ), null);
                return false;
            }
        }

        return true;
    }

    private logUserActivity(correlationId: string, account: AccountV1, activityType: string) {
        if (this._activitiesClient) {
            this._activitiesClient.logPartyActivity(
                correlationId,
                new PartyActivityV1(
                    null,
                    activityType,
                    {
                        id: account.id,
                        type: 'account',
                        name: account.name
                    }
                ),
                (err, activity) => {
                    if (err)
                        this._logger.error(correlationId, err, 'Failed to log user activity');
                }
            );
        }
    }

    public createAccount(correlationId: string, account: AccountV1,
        callback: (err: any, account: AccountV1) => void): void {

        // Validate account
        if (!this.validateAccount(correlationId, account, callback))
            return;

        async.series([
        // Verify if account already registered
            (callback) => {
                this._persistence.getOneByLogin(
                    correlationId,
                    account.login,
                    (err, data) => {
                        if (data) {
                            callback(
                                new BadRequestException(
                                    correlationId, 
                                    'ALREADY_EXIST', 
                                    'User account ' + account.login + ' already exist'
                                ).withDetails('login', account.login)
                            );
                            return;
                        }
                        callback();
                    }
                );
            },
        // Create account object
            (callback) => {
                this._persistence.create(
                    correlationId,
                    account, 
                    (err, data) => {
                        account = data;
                        callback(err);
                    }
                );
            },
            // Log activity
            (callback) => {
                this.logUserActivity(correlationId, account, AccountActivityTypeV1.AccountCreated);
                callback();
            }
        ], (err) => {
            callback(err, account);
        });
    }

    public updateAccount(correlationId: string, account: AccountV1,
        callback: (err: any, account: AccountV1) => void): void {

        let oldAccount: AccountV1;

        // Validate account
        if (!this.validateAccount(correlationId, account, callback))
            return;

        async.series([
        // Verify if account with new login already registered
            (callback) => {
                this._persistence.getOneByLogin(
                    correlationId,
                    account.login,
                    (err, data) => {
                        if (data && data.id != account.id) {
                            callback(
                                new BadRequestException(
                                    correlationId, 
                                    'ALREADY_EXIST', 
                                    'User account ' + account.login + ' is already exist'
                                ).withDetails('login', account.login),
                                null
                            );
                            return;
                        }
                        
                        if (data && data.id == account.id)
                            oldAccount = data;

                        callback();
                    }
                );
            },
        // Get the account
            (callback) => {
                if (oldAccount) {
                    callback();
                    return;
                }
                
                this._persistence.getOneById(
                    correlationId,
                    account.id, 
                    (err, data) => {
                        oldAccount = data;
                        if (oldAccount == null && err == null) {
                            err = new NotFoundException(
                                correlationId, 
                                'NOT_FOUND', 
                                'User account ' + account.id + ' was not found'
                            ).withDetails('id', account.id);
                        }
                        callback(err, null);
                    }
                );
            },
        // Change name and other fields and save
            (callback) => {
                this._persistence.update(
                    correlationId,
                    account,
                    (err, data) => {
                        account = data;
                        callback(err);
                    }
                );
            },
            // Log activity
            (callback) => {
                this.logUserActivity(correlationId, account, AccountActivityTypeV1.AccountChanged);
                callback();
            }
        ], (err) => {
            callback(err, account);
        });
    }

    public deleteAccountById(correlationId: string, id: string,
        callback: (err: any, account: AccountV1) => void): void {  
        let oldAccount: AccountV1;
        let newAccount: AccountV1;

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
                    this.logUserActivity(correlationId, oldAccount, AccountActivityTypeV1.AccountDeleted);
                callback();
            }
        ], (err) => {
            callback(err, err == null ? newAccount : null);
        });    
    }

}

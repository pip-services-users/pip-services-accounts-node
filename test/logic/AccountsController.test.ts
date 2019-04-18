let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { AccountV1 } from '../../src/data/version1/AccountV1';
import { AccountsMemoryPersistence } from '../../src/persistence/AccountsMemoryPersistence';
import { AccountsController } from '../../src/logic/AccountsController';

let ACCOUNT1 = new AccountV1('1', 'user1@conceptual.vision', 'Test User 1');
let ACCOUNT2 = new AccountV1('2', 'user2@conceptual.vision', 'Test User 2');

suite('AccountsController', ()=> {    
    let persistence: AccountsMemoryPersistence;
    let controller: AccountsController;

    setup(() => {
        persistence = new AccountsMemoryPersistence();

        controller = new AccountsController();
        controller.configure(ConfigParams.fromTuples(
            'options.login_as_email', true
        ));

        let references: References = References.fromTuples(
            new Descriptor('pip-services-accounts', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-accounts', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);
    });
    
    test('Create New User', (done) => {
        controller.createAccount(
            null,
            ACCOUNT1,
            (err, account) => {
                assert.isNull(err);
                
                assert.isObject(account);
                assert.equal(account.name, ACCOUNT1.name);
                assert.equal(account.login, ACCOUNT1.login);

                done();
            }
        );
    });

    test('Fail to Create Account with the Same Email', (done) => {
        async.series([
        // Sign up
            (callback) => {
                controller.createAccount(
                    null,
                    ACCOUNT1,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);

                        callback();
                    }
                );
            },
        // Try to sign up again
            (callback) => {
                controller.createAccount(
                    null,
                    ACCOUNT1,
                    (err, account) => {
                        assert.isNotNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Get Accounts', (done) => {
        let account1, account2;

        async.series([
        // Create account #1
            (callback) => {
                controller.createAccount(
                    null,
                    ACCOUNT1,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        account1 = account;

                        callback(err, account);
                    }
                );
            },
        // Create account #2
            (callback) => {
                controller.createAccount(
                    null,
                    ACCOUNT2,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        account2 = account;

                        callback(err, account);
                    }
                );
            },
        // Get a single account
            (callback) => {
                controller.getAccountById(
                    null,
                    account1.id,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, account1.id);
                        assert.equal(account.login, account1.login);

                        callback();
                    }
                );
            },
        // Find account by email
            (callback) => {
                controller.getAccountByIdOrLogin(
                    null,
                    account2.login,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, account2.id);
                        assert.equal(account.login, account2.login);

                        callback();
                    }
                );
            },
        // Get all accounts
            (callback) => {
                controller.getAccounts(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, accounts) => {
                        assert.isNull(err);
                        
                        assert.isObject(accounts);
                        assert.lengthOf(accounts.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Update Account', (done) => {
        let account1;

        async.series([
        // Sign up
            (callback) => {
                controller.createAccount(
                    null,
                    ACCOUNT1,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        account1 = account;

                        callback(err, account);
                    }
                );
            },
        // Update account
            (callback) => {
                account1.name = 'New Name';

                controller.updateAccount(
                    null,
                    account1,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.name, "New Name");

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Change Account Email', (done) => {
        let account1;

        async.series([
        // Sign up
            (callback) => {
                controller.createAccount(
                    null,
                    ACCOUNT1,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        account1 = account;

                        callback(err, account);
                    }
                );
            },
        // Change account email
            (callback) => {
                account1.login = 'test@test.com';
                account1.name = 'New Test Name';

                controller.updateAccount(
                    null,
                    account1,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.login, 'test@test.com');
                        assert.equal(account.name, 'New Test Name');

                        callback();
                    }
                );
            }
        ], done);
    });
    
});
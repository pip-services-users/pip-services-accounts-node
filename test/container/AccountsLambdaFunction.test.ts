let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { AccountV1 } from '../../src/data/version1/AccountV1';
import { AccountsMemoryPersistence } from '../../src/persistence/AccountsMemoryPersistence';
import { AccountsController } from '../../src/logic/AccountsController';
import { AccountsLambdaFunction } from '../../src/container/AccountsLambdaFunction';

let ACCOUNT1 = new AccountV1('1', 'account1@conceptual.vision', 'Test User 1');
let ACCOUNT2 = new AccountV1('2', 'account2@conceptual.vision', 'Test User 2');
let ACCOUNT3 = new AccountV1('3', 'account3@conceptual.vision', 'Test User 3');

suite('AccountsLambdaFunction', ()=> {
    let lambda: AccountsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-accounts:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-accounts:controller:default:default:1.0'
        );

        lambda = new AccountsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let account1: AccountV1;

        async.series([
        // Create one account
            (callback) => {
                lambda.act(
                    {
                        role: 'accounts',
                        cmd: 'create_account',
                        account: ACCOUNT1
                    },
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, ACCOUNT1.id);
                        assert.equal(account.login, ACCOUNT1.login);
                        assert.equal(account.name, ACCOUNT1.name);
                        assert.isTrue(account.active);

                        account1 = account;

                        callback();
                    }
                );
            },
        // Create another account
            (callback) => {
                lambda.act(
                    {
                        role: 'accounts',
                        cmd: 'create_account',
                        account: ACCOUNT2
                    },
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, ACCOUNT2.id);
                        assert.equal(account.login, ACCOUNT2.login);
                        assert.equal(account.name, ACCOUNT2.name);
                        assert.isTrue(account.active);

                        callback();
                    }
                );
            },
        // Create yet another quote
            (callback) => {
                lambda.act(
                    {
                        role: 'accounts',
                        cmd: 'create_account',
                        account: ACCOUNT3
                    },
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, ACCOUNT3.id);
                        assert.equal(account.login, ACCOUNT3.login);
                        assert.equal(account.name, ACCOUNT3.name);
                        assert.isTrue(account.active);

                        callback();
                    }
                );
            },
        // Get all accounts
            (callback) => {
                lambda.act(
                    {
                        role: 'accounts',
                        cmd: 'get_accounts',
                        filter: {}
                    },
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        callback();
                    }
                );
            },
        // Update the account
            (callback) => {
                account1.name = 'Updated User 1';

                lambda.act(
                    {
                        role: 'accounts',
                        cmd: 'update_account',
                        account: account1
                    },
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, account1.id)
                        assert.equal(account.name, 'Updated User 1');
                        assert.equal(account.login, account1.login);

                        callback();
                    }
                );
            },
        // Delete account
            (callback) => {
                lambda.act(
                    {
                        role: 'accounts',
                        cmd: 'delete_account_by_id',
                        account_id: ACCOUNT1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete account
            (callback) => {
                lambda.act(
                    {
                        role: 'accounts',
                        cmd: 'get_account_by_id',
                        account_id: ACCOUNT1.id
                    },
                    (err, account) => {
                        assert.isNull(err);
                        
                        //assert.isNull(account || null);

                        callback();
                    }
                );
            }
        ], done);
    });

});
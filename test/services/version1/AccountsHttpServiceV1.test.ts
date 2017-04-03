let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { AccountV1 } from '../../../src/data/version1/AccountV1';
import { AccountsMemoryPersistence } from '../../../src/persistence/AccountsMemoryPersistence';
import { AccountsController } from '../../../src/logic/AccountsController';
import { AccountsHttpServiceV1 } from '../../../src/services/version1/AccountsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ACCOUNT1 = new AccountV1('1', 'account1@conceptual.vision', 'Test User 1');
let ACCOUNT2 = new AccountV1('2', 'account2@conceptual.vision', 'Test User 2');
let ACCOUNT3 = new AccountV1('3', 'account3@conceptual.vision', 'Test User 3');

suite('AccountsHttpServiceV1', ()=> {
    let service: AccountsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new AccountsMemoryPersistence();
        let controller = new AccountsController();

        service = new AccountsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-accounts', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-accounts', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-accounts', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', (done) => {
        let account1: AccountV1;

        async.series([
        // Create one account
            (callback) => {
                rest.post('/accounts/create_account',
                    {
                        account: ACCOUNT1
                    },
                    (err, req, res, account) => {
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
                rest.post('/accounts/create_account',
                    {
                        account: ACCOUNT2
                    },
                    (err, req, res, account) => {
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
                rest.post('/accounts/create_account',
                    {
                        account: ACCOUNT3
                    },
                    (err, req, res, account) => {
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
                rest.post('/accounts/get_accounts',
                    {
                        filter: {}
                    },
                    (err, req, res, page) => {
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

                rest.post('/accounts/update_account',
                    {
                        account: account1
                    },
                    (err, req, res, account) => {
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
                rest.post('/accounts/delete_account_by_id',
                    {
                        account_id: ACCOUNT1.id
                    },
                    (err, req, res, account) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete account
            (callback) => {
                rest.post('/accounts/get_account_by_id',
                    {
                        account_id: ACCOUNT1.id
                    },
                    (err, req, res, account) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });
});
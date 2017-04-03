let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { AccountV1 } from '../../../src/data/version1/AccountV1';
import { AccountsMemoryPersistence } from '../../../src/persistence/AccountsMemoryPersistence';
import { AccountsController } from '../../../src/logic/AccountsController';
import { AccountsSenecaServiceV1 } from '../../../src/services/version1/AccountsSenecaServiceV1';

let ACCOUNT1 = new AccountV1('1', 'account1@conceptual.vision', 'Test User 1');
let ACCOUNT2 = new AccountV1('2', 'account2@conceptual.vision', 'Test User 2');
let ACCOUNT3 = new AccountV1('3', 'account3@conceptual.vision', 'Test User 3');

suite('AccountsSenecaServiceV1', ()=> {        
     let seneca: any;
    let service: AccountsSenecaServiceV1;
    let persistence: AccountsMemoryPersistence;
    let controller: AccountsController;

    suiteSetup((done) => {
        persistence = new AccountsMemoryPersistence();
        controller = new AccountsController();

        service = new AccountsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-accounts', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-accounts', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-accounts', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let account1: AccountV1;

        async.series([
        // Create one account
            (callback) => {
                seneca.act(
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
                seneca.act(
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
                seneca.act(
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
                seneca.act(
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

                seneca.act(
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
                seneca.act(
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
                seneca.act(
                    {
                        role: 'accounts',
                        cmd: 'get_account_by_id',
                        account_id: ACCOUNT1.id
                    },
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isNull(account || null);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});
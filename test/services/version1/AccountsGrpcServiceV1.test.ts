let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

let services = require('../../../../src/protos/accounts_v1_grpc_pb');
let messages = require('../../../../src/protos/accounts_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { AccountV1 } from '../../../src/data/version1/AccountV1';
import { AccountsMemoryPersistence } from '../../../src/persistence/AccountsMemoryPersistence';
import { AccountsController } from '../../../src/logic/AccountsController';
import { AccountsGrpcServiceV1 } from '../../../src/services/version1/AccountsGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ACCOUNT1 = new AccountV1('1', 'account1@conceptual.vision', 'Test User 1');
let ACCOUNT2 = new AccountV1('2', 'account2@conceptual.vision', 'Test User 2');
let ACCOUNT3 = new AccountV1('3', 'account3@conceptual.vision', 'Test User 3');

suite('AccountsGrpcServiceV1', ()=> {
    let service: AccountsGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let persistence = new AccountsMemoryPersistence();
        let controller = new AccountsController();

        service = new AccountsGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-accounts', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-accounts', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-accounts', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/accounts_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).accounts.Accounts;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', (done) => {
        let account1, account2;

        async.series([
        // Create one account
            (callback) => {
                client.create_account(
                    { 
                        account: ACCOUNT1 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let account = response ? response.account : null;

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
                client.create_account(
                    { 
                        account: ACCOUNT2 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let account = response ? response.account : null;

                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, ACCOUNT2.id);
                        assert.equal(account.login, ACCOUNT2.login);
                        assert.equal(account.name, ACCOUNT2.name);
                        assert.isTrue(account.active);

                        account2 = account;

                        callback();
                    }
                );
            },
        // Create yet another account
            (callback) => {
                client.create_account(
                    { 
                        account: ACCOUNT3
                    },
                    (err, response) => {
                        err = err || response.error;
                        let account = response ? response.account : null;

                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, ACCOUNT3.id);
                        assert.equal(account.login, ACCOUNT3.login);
                        assert.equal(account.name, ACCOUNT3.name);
                        assert.isTrue(account.active);

                        account2 = account;

                        callback();
                    }
                );
            },
    // Get all accounts
            (callback) => {
                client.get_accounts(
                    {
                        filter: {}
                    },
                    (err, response) => {
                        err = err || response.error;
                        let accounts = response ? response.page : null;

                        assert.isNull(err);
                        
                        assert.isObject(accounts);
                        assert.lengthOf(accounts.data, 3);

                        callback();
                    }
                );
            },
        // Update the account
            (callback) => {
                account1.name = 'Updated User 1';

                client.update_account(
                    { 
                        account: account1 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let account = response ? response.account : null;

                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, account1.id)
                        assert.equal(account.name, 'Updated User 1');
                        assert.equal(account.login, account1.login);

                        account1 = account;

                        callback();
                    }
                );
            },
        // Delete account
            (callback) => {
                client.delete_account_by_id(
                    { 
                        account_id: account1.id 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let account = response ? response.account : null;

                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete account
            (callback) => {
                client.get_account_by_id(
                    { 
                        account_id: account1.id 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let account = response ? response.account : null;

                        assert.isNull(err);
                        
                        //assert.isObject(account);

                        callback();
                    }
                );
            }
        ], done);
    });

});

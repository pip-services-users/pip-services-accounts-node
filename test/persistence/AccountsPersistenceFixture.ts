let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { AccountV1 } from '../../src/data/version1/AccountV1';
import { IAccountsPersistence } from '../../src/persistence/IAccountsPersistence';

let ACCOUNT1 = new AccountV1('1', 'user1@conceptual.vision', 'Test User 1');
let ACCOUNT2 = new AccountV1('2', 'user2@conceptual.vision', 'Test User 2');
let ACCOUNT3 = new AccountV1('3', 'user3@conceptual.vision', 'Test User 3');

export class AccountsPersistenceFixture {
    private _persistence: IAccountsPersistence;
    
    constructor(persistence: IAccountsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private createAccounts(done) {
        async.series([
            // (callback) => {
            //     setTimeout(callback, 1000);
            // },
        // Create one account
            (callback) => {
                this._persistence.create(
                    null,
                    ACCOUNT1,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, ACCOUNT1.id);
                        assert.equal(account.login, ACCOUNT1.login);
                        assert.equal(account.name, ACCOUNT1.name);
                        assert.isTrue(account.active);

                        callback();
                    }
                );
            },
        // Create another account
            (callback) => {
                this._persistence.create(
                    null,
                    ACCOUNT2,
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
        // Create yet another account
            (callback) => {
                this._persistence.create(
                    null,
                    ACCOUNT3,
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
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let account1;

        async.series([
        // Create items
            (callback) => {
                this.createAccounts(callback);
            },
        // Get all account
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        account1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the account
            (callback) => {
                account1.name = 'Updated User 1';

                this._persistence.update(
                    null,
                    account1,
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
                this._persistence.deleteById(
                    null,
                    ACCOUNT1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get deleted account
            (callback) => {
                this._persistence.getOneById(
                    null,
                    ACCOUNT1.id,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isNull(user || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create accounts
            (callback) => {
                this.createAccounts(callback);
            },
        // Get account filtered by active
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        active: true,
                        search: 'user'
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        callback();
                    }
                );
            },
        // Get account by email
            (callback) => {
                this._persistence.getOneByLogin(
                    null,
                    ACCOUNT2.login,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, ACCOUNT2.id);

                        callback();
                    }
                );
            },
        // Get account by id or email
            (callback) => {
                this._persistence.getOneByIdOrLogin(
                    null,
                    ACCOUNT3.login,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.id, ACCOUNT3.id);

                        callback();
                    }
                );
            }
        ], done);
    }

}

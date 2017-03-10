let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IUsersPersistence } from '../../src/persistence/IUsersPersistence';

let USER1 = {
    id: '1',
    name: 'Test User 1',
    email: 'user1@digitallivingsoftware.com'
};
let USER2 = {
    id: '2',
    name: 'Test User 2',
    email: 'user2@digitallivingsoftware.com'
};
let USER3 = {
    id: '3',
    name: 'Test User 3',
    email: 'user3@digitallivingsoftware.com'
};

export class UsersPersistenceFixture {
    private _db: IUsersPersistence;
    
    constructor(db) {
        assert.isNotNull(db);
        this._db = db;
    }

    createUsers(done) {
        async.series([
        // Create one user
            (callback) => {
                this._db.createUser(
                    null,
                    USER1,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, USER1.id);
                        assert.equal(user.email, USER1.email);
                        assert.equal(user.name, USER1.name);
                        assert.isTrue(user.active);

                        callback();
                    }
                );
            },
        // Create another user
            (callback) => {
                this._db.createUser(
                    null,
                    USER2,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, USER2.id);
                        assert.equal(user.email, USER2.email);
                        assert.equal(user.name, USER2.name);
                        assert.isTrue(user.active);

                        callback();
                    }
                );
            },
        // Create yet another quote
            (callback) => {
                this._db.createUser(
                    null,
                    USER3,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, USER3.id);
                        assert.equal(user.email, USER3.email);
                        assert.equal(user.name, USER3.name);
                        assert.isTrue(user.active);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    testCrudOperations(done) {
        async.series([
        // Create items
            (callback) => {
                this.createUsers(callback);
            },
        // Get all users
            (callback) => {
                this._db.getUsers(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, users) => {
                        assert.isNull(err);
                        
                        assert.isObject(users);
                        assert.lengthOf(users.data, 3);

                        callback();
                    }
                );
            },
        // Update the user
            (callback) => {
                this._db.updateUser(
                    null,
                    USER1.id,
                    { name: 'Updated User 1' },
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, USER1.id)
                        assert.equal(user.name, 'Updated User 1');
                        assert.equal(user.email, USER1.email);

                        callback();
                    }
                );
            },
        // Delete user
            (callback) => {
                this._db.deleteUser(
                    null,
                    USER1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete user
            (callback) => {
                this._db.getUserById(
                    null,
                    USER1.id,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isNull(user || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
        // Create users
            (callback) => {
                this.createUsers(callback);
            },
        // Get users filtered by active
            (callback) => {
                this._db.getUsers(
                    null,
                    FilterParams.fromValue({
                        active: true,
                        lock: false,
                        search: 'Test'
                    }),
                    new PagingParams(),
                    (err, users) => {
                        assert.isNull(err);
                        
                        assert.isObject(users);
                        assert.lengthOf(users.data, 3);

                        callback();
                    }
                );
            },
        // Get user by email
            (callback) => {
                this._db.getUserByEmail(
                    null,
                    USER2.email,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, USER2.id);

                        callback();
                    }
                );
            },
        // Get user by id or email
            (callback) => {
                this._db.getUserByIdOrEmail(
                    null,
                    USER3.id,
                    USER3.email,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, USER3.id);

                        callback();
                    }
                );
            }
        ], done);
    }

}

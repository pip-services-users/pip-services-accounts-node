"use strict";
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var USER1 = {
    id: '1',
    name: 'Test User 1',
    email: 'user1@digitallivingsoftware.com'
};
var USER2 = {
    id: '2',
    name: 'Test User 2',
    email: 'user2@digitallivingsoftware.com'
};
var USER3 = {
    id: '3',
    name: 'Test User 3',
    email: 'user3@digitallivingsoftware.com'
};
var UsersPersistenceFixture = (function () {
    function UsersPersistenceFixture(db) {
        assert.isNotNull(db);
        this._db = db;
    }
    UsersPersistenceFixture.prototype.createUsers = function (done) {
        var _this = this;
        async.series([
            // Create one user
            function (callback) {
                _this._db.createUser(null, USER1, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.id, USER1.id);
                    assert.equal(user.email, USER1.email);
                    assert.equal(user.name, USER1.name);
                    assert.isTrue(user.active);
                    callback();
                });
            },
            // Create another user
            function (callback) {
                _this._db.createUser(null, USER2, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.id, USER2.id);
                    assert.equal(user.email, USER2.email);
                    assert.equal(user.name, USER2.name);
                    assert.isTrue(user.active);
                    callback();
                });
            },
            // Create yet another quote
            function (callback) {
                _this._db.createUser(null, USER3, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.id, USER3.id);
                    assert.equal(user.email, USER3.email);
                    assert.equal(user.name, USER3.name);
                    assert.isTrue(user.active);
                    callback();
                });
            }
        ], done);
    };
    UsersPersistenceFixture.prototype.testCrudOperations = function (done) {
        var _this = this;
        async.series([
            // Create items
            function (callback) {
                _this.createUsers(callback);
            },
            // Get all users
            function (callback) {
                _this._db.getUsers(null, new pip_services_runtime_node_1.FilterParams(), new pip_services_runtime_node_2.PagingParams(), function (err, users) {
                    assert.isNull(err);
                    assert.isObject(users);
                    assert.lengthOf(users.data, 3);
                    callback();
                });
            },
            // Update the user
            function (callback) {
                _this._db.updateUser(null, USER1.id, { name: 'Updated User 1' }, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.id, USER1.id);
                    assert.equal(user.name, 'Updated User 1');
                    assert.equal(user.email, USER1.email);
                    callback();
                });
            },
            // Delete user
            function (callback) {
                _this._db.deleteUser(null, USER1.id, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete user
            function (callback) {
                _this._db.getUserById(null, USER1.id, function (err, user) {
                    assert.isNull(err);
                    assert.isNull(user || null);
                    callback();
                });
            }
        ], done);
    };
    UsersPersistenceFixture.prototype.testGetWithFilter = function (done) {
        var _this = this;
        async.series([
            // Create users
            function (callback) {
                _this.createUsers(callback);
            },
            // Get users filtered by active
            function (callback) {
                _this._db.getUsers(null, pip_services_runtime_node_1.FilterParams.fromValue({
                    active: true,
                    lock: false,
                    search: 'Test'
                }), new pip_services_runtime_node_2.PagingParams(), function (err, users) {
                    assert.isNull(err);
                    assert.isObject(users);
                    assert.lengthOf(users.data, 3);
                    callback();
                });
            },
            // Get user by email
            function (callback) {
                _this._db.getUserByEmail(null, USER2.email, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.id, USER2.id);
                    callback();
                });
            },
            // Get user by id or email
            function (callback) {
                _this._db.getUserByIdOrEmail(null, USER3.id, USER3.email, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.id, USER3.id);
                    callback();
                });
            }
        ], done);
    };
    return UsersPersistenceFixture;
}());
exports.UsersPersistenceFixture = UsersPersistenceFixture;

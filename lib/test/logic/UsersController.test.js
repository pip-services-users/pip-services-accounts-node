"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var UsersMemoryPersistence_1 = require('../../src/persistence/UsersMemoryPersistence');
var UsersController_1 = require('../../src/logic/UsersController');
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
suite('UsersController', function () {
    var db = new UsersMemoryPersistence_1.UsersMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new UsersController_1.UsersController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl);
    suiteSetup(function (done) {
        pip_services_runtime_node_5.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_5.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Create New User', function (done) {
        ctrl.createUser(null, USER1, function (err, user) {
            assert.isNull(err);
            assert.isObject(user);
            assert.equal(user.name, USER1.name);
            assert.equal(user.email, USER1.email);
            done();
        });
    });
    test('Fail to Create User with the Same Email', function (done) {
        async.series([
            // Sign up
            function (callback) {
                ctrl.createUser(null, USER1, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    callback();
                });
            },
            // Try to sign up again
            function (callback) {
                ctrl.createUser(null, USER1, function (err, user) {
                    assert.isNotNull(err);
                    callback();
                });
            }
        ], done);
    });
    test('Get Users', function (done) {
        var user1, user2;
        async.series([
            // Create user #1
            function (callback) {
                ctrl.createUser(null, USER1, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    user1 = user;
                    callback(err, user);
                });
            },
            // Create user #2
            function (callback) {
                ctrl.createUser(null, USER2, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    user2 = user;
                    callback(err, user);
                });
            },
            // Get a single user
            function (callback) {
                ctrl.getUserById(null, user1.id, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.id, user1.id);
                    assert.equal(user.email, user1.email);
                    callback();
                });
            },
            // Find user by email
            function (callback) {
                ctrl.findUser(null, null, user2.email, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.id, user2.id);
                    assert.equal(user.email, user2.email);
                    callback();
                });
            },
            // Get all users
            function (callback) {
                ctrl.getUsers(null, new pip_services_runtime_node_3.FilterParams(), new pip_services_runtime_node_4.PagingParams(), function (err, users) {
                    assert.isNull(err);
                    assert.isObject(users);
                    // +3 more predefined users
                    assert.lengthOf(users.data, 2);
                    callback();
                });
            }
        ], done);
    });
    test('Update User Settings', function (done) {
        var user1;
        async.series([
            // Sign up
            function (callback) {
                ctrl.createUser(null, USER1, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    user1 = user;
                    callback(err, user);
                });
            },
            // Update user
            function (callback) {
                ctrl.updateUser(null, user1.id, {
                    name: "New Name"
                }, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.name, "New Name");
                    callback();
                });
            }
        ], done);
    });
    test('Rename User', function (done) {
        var user1;
        async.series([
            // Sign up
            function (callback) {
                ctrl.createUser(null, USER1, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    user1 = user;
                    callback(err, user);
                });
            },
            // Rename user
            function (callback) {
                ctrl.renameUser(null, user1.id, 'test@test.com', 'New Test Name', function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.email, 'test@test.com');
                    assert.equal(user.name, 'New Test Name');
                    callback();
                });
            }
        ], done);
    });
});

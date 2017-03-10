"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var UsersMemoryPersistence_1 = require('../../../src/persistence/UsersMemoryPersistence');
var UsersController_1 = require('../../../src/logic/UsersController');
var UsersSenecaService_1 = require('../../../src/services/version1/UsersSenecaService');
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
suite('UsersSenecaService', function () {
    var db = new UsersMemoryPersistence_1.UsersMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new UsersController_1.UsersController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new UsersSenecaService_1.UsersSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        async.series([
            // Create one user
            function (callback) {
                seneca.getSeneca().act({
                    role: 'users',
                    cmd: 'create_user',
                    user: USER1
                }, function (err, user) {
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
                seneca.getSeneca().act({
                    role: 'users',
                    cmd: 'create_user',
                    user: USER2
                }, function (err, user) {
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
                seneca.getSeneca().act({
                    role: 'users',
                    cmd: 'create_user',
                    user: USER3
                }, function (err, user) {
                    assert.isNull(err);
                    assert.isObject(user);
                    assert.equal(user.id, USER3.id);
                    assert.equal(user.email, USER3.email);
                    assert.equal(user.name, USER3.name);
                    assert.isTrue(user.active);
                    callback();
                });
            },
            // Get all users
            function (callback) {
                seneca.getSeneca().act({
                    role: 'users',
                    cmd: 'get_users',
                    filter: {}
                }, function (err, users) {
                    assert.isNull(err);
                    assert.isObject(users);
                    assert.lengthOf(users.data, 3);
                    callback();
                });
            },
            // Update the user
            function (callback) {
                seneca.getSeneca().act({
                    role: 'users',
                    cmd: 'update_user',
                    user_id: USER1.id,
                    user: { name: 'Updated User 1' }
                }, function (err, user) {
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
                seneca.getSeneca().act({
                    role: 'users',
                    cmd: 'delete_user',
                    user_id: USER1.id
                }, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete user
            function (callback) {
                seneca.getSeneca().act({
                    role: 'users',
                    cmd: 'get_user_by_id',
                    user_id: USER1.id
                }, function (err, user) {
                    assert.isNull(err);
                    assert.isNull(user || null);
                    callback();
                });
            }
        ], done);
    });
});

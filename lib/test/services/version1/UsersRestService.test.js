"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var UsersMemoryPersistence_1 = require('../../../src/persistence/UsersMemoryPersistence');
var UsersController_1 = require('../../../src/logic/UsersController');
var UsersRestService_1 = require('../../../src/services/version1/UsersRestService');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.host', 'localhost', 'endpoint.port', 3000);
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
suite('UsersRestService', function () {
    var db = new UsersMemoryPersistence_1.UsersMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new UsersController_1.UsersController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new UsersRestService_1.UsersRestService();
    service.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service);
    var url = restConfig.getEndpoint().getUri();
    var rest = restify.createJsonClient({ url: url, version: '*' });
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        async.series([
            // Create one user
            function (callback) {
                rest.post('/users', USER1, function (err, req, res, user) {
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
                rest.post('/users', USER2, function (err, req, res, user) {
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
                rest.post('/users', USER3, function (err, req, res, user) {
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
                rest.get('/users', function (err, req, res, users) {
                    assert.isNull(err);
                    assert.isObject(users);
                    assert.lengthOf(users.data, 3);
                    callback();
                });
            },
            // Update the user
            function (callback) {
                rest.put('/users/' + USER1.id, {
                    name: 'Updated User 1'
                }, function (err, req, res, user) {
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
                rest.del('/users/' + USER1.id, function (err, req, res, result) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete user
            function (callback) {
                rest.get('/users/' + USER1.id, function (err, req, res, user) {
                    //assert.resultNull(err, user);
                    callback();
                });
            }
        ], done);
    });
});

"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var UsersMongoDbPersistence_1 = require('../../src/persistence/UsersMongoDbPersistence');
var UsersPersistenceFixture_1 = require('./UsersPersistenceFixture');
var options = new pip_services_runtime_node_3.DynamicMap(require('../../../config/config'));
var dbOptions = pip_services_runtime_node_2.ComponentConfig.fromValue(options.getNullableMap('persistence'));
suite('UsersMongoDbPersistence', function () {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return;
    var db = new UsersMongoDbPersistence_1.UsersMongoDbPersistence();
    db.configure(dbOptions);
    var fixture = new UsersPersistenceFixture_1.UsersPersistenceFixture(db);
    suiteSetup(function (done) {
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    suiteTeardown(function (done) {
        db.close(done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
    test('Get with Filters', function (done) {
        fixture.testGetWithFilter(done);
    });
});

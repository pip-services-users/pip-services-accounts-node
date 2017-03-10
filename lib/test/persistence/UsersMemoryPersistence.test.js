"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var UsersMemoryPersistence_1 = require('../../src/persistence/UsersMemoryPersistence');
var UsersPersistenceFixture_1 = require('./UsersPersistenceFixture');
suite('UsersFilePersistence', function () {
    var db, fixture;
    setup(function (done) {
        db = new UsersMemoryPersistence_1.UsersMemoryPersistence();
        db.configure(new pip_services_runtime_node_2.ComponentConfig());
        fixture = new UsersPersistenceFixture_1.UsersPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    teardown(function (done) {
        db.close(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
    test('Get with Filters', function (done) {
        fixture.testGetWithFilter(done);
    });
});

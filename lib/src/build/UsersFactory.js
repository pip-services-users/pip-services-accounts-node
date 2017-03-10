"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_clients_activities_node_1 = require('pip-clients-activities-node');
var UsersMongoDbPersistence_1 = require('../persistence/UsersMongoDbPersistence');
var UsersFilePersistence_1 = require('../persistence/UsersFilePersistence');
var UsersMemoryPersistence_1 = require('../persistence/UsersMemoryPersistence');
var UsersController_1 = require('../logic/UsersController');
var UsersRestService_1 = require('../services/version1/UsersRestService');
var UsersSenecaService_1 = require('../services/version1/UsersSenecaService');
var UsersFactory = (function (_super) {
    __extends(UsersFactory, _super);
    function UsersFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance, pip_clients_activities_node_1.ActivitiesFactory.Instance);
        this.register(UsersFilePersistence_1.UsersFilePersistence.Descriptor, UsersFilePersistence_1.UsersFilePersistence);
        this.register(UsersMemoryPersistence_1.UsersMemoryPersistence.Descriptor, UsersMemoryPersistence_1.UsersMemoryPersistence);
        this.register(UsersMongoDbPersistence_1.UsersMongoDbPersistence.Descriptor, UsersMongoDbPersistence_1.UsersMongoDbPersistence);
        this.register(UsersController_1.UsersController.Descriptor, UsersController_1.UsersController);
        this.register(UsersRestService_1.UsersRestService.Descriptor, UsersRestService_1.UsersRestService);
        this.register(UsersSenecaService_1.UsersSenecaService.Descriptor, UsersSenecaService_1.UsersSenecaService);
    }
    UsersFactory.Instance = new UsersFactory();
    return UsersFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.UsersFactory = UsersFactory;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var UsersFilePersistence_1 = require('./UsersFilePersistence');
var UsersMemoryPersistence = (function (_super) {
    __extends(UsersMemoryPersistence, _super);
    function UsersMemoryPersistence() {
        _super.call(this, UsersMemoryPersistence.Descriptor);
    }
    UsersMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    UsersMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the UsersMemoryPersistence component
     */
    UsersMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-users", "memory", "*");
    return UsersMemoryPersistence;
}(UsersFilePersistence_1.UsersFilePersistence));
exports.UsersMemoryPersistence = UsersMemoryPersistence;

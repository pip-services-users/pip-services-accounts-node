"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var UsersFilePersistence = (function (_super) {
    __extends(UsersFilePersistence, _super);
    function UsersFilePersistence(descriptor) {
        _super.call(this, descriptor || UsersFilePersistence.Descriptor);
    }
    UsersFilePersistence.prototype.validateUser = function (item) {
        return _.pick(item, 'id', 'name', 'email', 'created', 'active', 'time_zone', 'language', 'theme', 'custom_hdr', 'custom_dat');
    };
    UsersFilePersistence.prototype.getUsers = function (correlationId, filter, paging, callback) {
        var filterParams = filter || {};
        var email = filterParams.email;
        var name = filterParams.name;
        var active = pip_services_runtime_node_4.Converter.toBoolean(filterParams.active);
        var search = filterParams.search ? new RegExp(filterParams.search, 'i') : null;
        var filterFunc = function (item) {
            if (filterParams.email && email != item.email)
                return false;
            if (filterParams.name && name != item.name)
                return false;
            if (filterParams.active && active != item.active)
                return false;
            if (filterParams.search && !search.test(item.email) && !search.test(item.name))
                return false;
            return true;
        };
        this.getPage(filterFunc, paging, null, null, callback);
    };
    UsersFilePersistence.prototype.getUserById = function (correlationId, userId, callback) {
        this.getById(userId, function (err, item) {
            if (err)
                callback(err);
            else {
                callback(null, item);
            }
        });
    };
    UsersFilePersistence.prototype.getUserByEmail = function (correlationId, email, callback) {
        var item = _.find(this._items, function (item) { return item.email == email; });
        callback(null, item);
    };
    UsersFilePersistence.prototype.getUserByIdOrEmail = function (correlationId, userId, email, callback) {
        var item = _.find(this._items, function (item) { return item.id == userId || item.email == email; });
        callback(null, item);
    };
    UsersFilePersistence.prototype.createUser = function (correlationId, user, callback) {
        var item = this.validateUser(user);
        item.id = user.id || this.createUuid();
        item.active = true;
        item.created = new Date();
        this.create(item, callback);
    };
    UsersFilePersistence.prototype.updateUser = function (correlationId, userId, user, callback) {
        var _this = this;
        user = this.validateUser(user);
        user = _.omit(user, 'id');
        this.getById(userId, function (err, item) {
            if (err || item == null) {
                callback(err, null);
                return;
            }
            _.assign(item, user);
            _this.save(function (err) {
                if (err)
                    callback(err);
                else
                    callback(null, item);
            });
        });
    };
    UsersFilePersistence.prototype.deleteUser = function (correlationId, userId, callback) {
        this.delete(userId, callback);
    };
    /**
     * Unique descriptor for the UsersFilePersistence component
     */
    UsersFilePersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-users", "file", "*");
    return UsersFilePersistence;
}(pip_services_runtime_node_3.FilePersistence));
exports.UsersFilePersistence = UsersFilePersistence;

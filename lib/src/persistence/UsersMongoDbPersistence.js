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
var UsersMongoDbPersistence = (function (_super) {
    __extends(UsersMongoDbPersistence, _super);
    function UsersMongoDbPersistence() {
        _super.call(this, UsersMongoDbPersistence.Descriptor, require('./UserModel'));
    }
    UsersMongoDbPersistence.prototype.getUsers = function (correlationId, filter, paging, callback) {
        var filterParams = filter || new pip_services_runtime_node_3.FilterParams();
        var criteria = _.pick(filterParams, 'email', 'name');
        // Process search keyword
        if (filterParams.has('search')) {
            var search = filterParams.get('search');
            var searchRegex = new RegExp(search, 'i');
            criteria.$or = [
                { name: { $regex: searchRegex } },
                { email: { $regex: searchRegex } }
            ];
        }
        // Process active keyword
        if (filterParams.has('active'))
            criteria.active = filterParams.getBoolean('active');
        this.getPage(criteria, paging, '-created', { custom_dat: 0, email_config: 0 }, callback);
    };
    UsersMongoDbPersistence.prototype.getUserById = function (correlationId, userId, callback) {
        this.getById(userId, callback);
    };
    UsersMongoDbPersistence.prototype.getUserByEmail = function (correlationId, email, callback) {
        var _this = this;
        this._model.findOne({
            email: email
        }, function (err, items) {
            items = _this._converter(items);
            callback(err, items);
        });
    };
    UsersMongoDbPersistence.prototype.getUserByIdOrEmail = function (correlationId, userId, email, callback) {
        var _this = this;
        var criteria = {};
        if (userId)
            criteria._id = userId;
        if (email)
            criteria.email = email;
        this._model.findOne(criteria, function (err, items) {
            items = _this._converter(items);
            callback(err, items);
        });
    };
    UsersMongoDbPersistence.prototype.createUser = function (correlationId, user, callback) {
        var item = _.omit(user, '_id');
        item._id = user.id || this.createUuid();
        item.active = true;
        item.created = new Date();
        this.create(item, callback);
    };
    UsersMongoDbPersistence.prototype.updateUser = function (correlationId, userId, user, callback) {
        user = _.omit(user, '_id');
        this.update(userId, user, callback);
    };
    UsersMongoDbPersistence.prototype.deleteUser = function (userId, callback) {
        this.delete(userId, callback);
    };
    /**
     * Unique descriptor for the UsersMongoDbPersistence component
     */
    UsersMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-users", "mongodb", "*");
    return UsersMongoDbPersistence;
}(pip_services_runtime_node_4.MongoDbPersistence));
exports.UsersMongoDbPersistence = UsersMongoDbPersistence;

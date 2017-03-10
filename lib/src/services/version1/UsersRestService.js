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
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var UsersRestService = (function (_super) {
    __extends(UsersRestService, _super);
    function UsersRestService() {
        _super.call(this, UsersRestService.Descriptor);
    }
    UsersRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-users", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    UsersRestService.prototype.getUsers = function (req, res) {
        this._logic.getUsers(req.params.correlation_id, new pip_services_runtime_node_3.FilterParams(req.params), new pip_services_runtime_node_4.PagingParams(req.params), this.sendResult(req, res));
    };
    UsersRestService.prototype.findUser = function (req, res) {
        this._logic.findUser(req.params.correlation_id, req.params.userId || req.params.user_id, req.params.email, this.sendResult(req, res));
    };
    UsersRestService.prototype.getUserById = function (req, res) {
        this._logic.getUserById(req.params.correlation_id, req.params.userId, this.sendResult(req, res));
    };
    UsersRestService.prototype.createUser = function (req, res) {
        this._logic.createUser(req.params.correlation_id, req.body, this.sendCreatedResult(req, res));
    };
    UsersRestService.prototype.updateUser = function (req, res) {
        this._logic.updateUser(req.params.correlation_id, req.params.userId, req.body, this.sendResult(req, res));
    };
    UsersRestService.prototype.deleteUser = function (req, res) {
        this._logic.deleteUser(req.params.correlation_id, req.params.userId, this.sendDeletedResult(req, res));
    };
    UsersRestService.prototype.register = function () {
        this.registerRoute('get', '/users', this.getUsers);
        this.registerRoute('get', '/users/find', this.findUser);
        this.registerRoute('get', '/users/:userId', this.getUserById);
        this.registerRoute('get', '/users/:userId/find', this.findUser);
        this.registerRoute('post', '/users', this.createUser);
        this.registerRoute('put', '/users/:userId', this.updateUser);
        this.registerRoute('delete', '/users/:userId', this.deleteUser);
    };
    /**
     * Unique descriptor for the UsersRestService component
     */
    UsersRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-users", "rest", "1.0");
    return UsersRestService;
}(pip_services_runtime_node_5.RestService));
exports.UsersRestService = UsersRestService;

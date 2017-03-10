"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var async = require('async');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var UsersCommandSet_1 = require('./UsersCommandSet');
var UsersController = (function (_super) {
    __extends(UsersController, _super);
    function UsersController() {
        _super.call(this, UsersController.Descriptor);
        this.EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    UsersController.prototype.link = function (components) {
        // Locate reference to users persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-users", '*', '*'));
        this._activities = components.getOneOptional(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-activities", '*', '1.0'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new UsersCommandSet_1.UsersCommandSet(this);
        this.addCommandSet(commands);
    };
    UsersController.prototype.readUser = function (correlationId, userId, email, callback) {
        var _this = this;
        this._db.getUserByIdOrEmail(correlationId, userId, email, function (err, item) {
            if (item == null && err == null) {
                err = new pip_services_runtime_node_4.NotFoundError(_this, 'UserNotFound', 'User ' + (email || userId) + ' was not found')
                    .withDetails(email || userId);
            }
            callback(err, item);
        });
    };
    UsersController.prototype.logActivity = function (correlationId, activity) {
        var _this = this;
        if (this._activities) {
            this._activities.logPartyActivity(correlationId, activity, function (err) {
                if (err)
                    _this.error('Failed while logging user activity', err);
            });
        }
    };
    UsersController.prototype.getUsers = function (correlationId, filter, paging, callback) {
        this._db.getUsers(correlationId, filter, paging, callback);
    };
    UsersController.prototype.findUser = function (correlationId, userId, email, callback) {
        this._db.getUserByIdOrEmail(correlationId, userId, email, callback);
    };
    UsersController.prototype.getUserById = function (correlationId, userId, callback) {
        this._db.getUserById(correlationId, userId, callback);
    };
    UsersController.prototype.validateUser = function (user, callback) {
        if (user.email == null) {
            callback(new pip_services_runtime_node_5.BadRequestError(this, 'NoUserEmail', 'Missing user primary email'));
            return false;
        }
        if (!this.EMAIL_REGEX.test(user.email)) {
            callback(new pip_services_runtime_node_5.BadRequestError(this, 'WrongUserEmail', 'Invalid user primary email').withDetails(user.email));
            return false;
        }
        if (user.name == null) {
            callback(new pip_services_runtime_node_5.BadRequestError(this, 'NoUserName', 'Missing user name'));
            return false;
        }
        return true;
    };
    UsersController.prototype.createUser = function (correlationId, user, callback) {
        var _this = this;
        var newUser = _.pick(user, 'id', 'name', 'email', 'time_zone', 'language', 'theme', 'custom_hdr', 'custom_dat');
        var createdUser;
        // Validate user
        if (!this.validateUser(newUser, callback))
            return;
        async.series([
            // Verify if email already registered
            function (callback) {
                _this._db.getUserByEmail(correlationId, newUser.email, function (err, data) {
                    if (data) {
                        callback(new pip_services_runtime_node_5.BadRequestError(_this, 'EmailAlreadyRegistered', 'Email ' + data.email + ' is already registered').withDetails(data.email));
                        return;
                    }
                    callback();
                });
            },
            // Create user object
            function (callback) {
                _this._db.createUser(correlationId, newUser, function (err, data) {
                    createdUser = data;
                    callback(err);
                });
            }
        ], function (err) {
            callback(err, createdUser);
        });
    };
    UsersController.prototype.renameUser = function (correlationId, userId, newEmail, newName, callback) {
        var user = {};
        if (newEmail)
            user.email = newEmail;
        if (newName)
            user.name = newName;
        this.updateUser(correlationId, userId, user, callback);
    };
    UsersController.prototype.updateUser = function (correlationId, userId, user, callback) {
        var _this = this;
        var newUser = _.pick(user, 'name', 'email', 'language', 'time_zone', 'theme', 'active');
        var oldUser, updatedUser;
        async.series([
            // Verify if email already registered
            function (callback) {
                _this._db.getUserByEmail(correlationId, newUser.email, function (err, data) {
                    if (data && data.id != userId) {
                        callback(new pip_services_runtime_node_5.BadRequestError(_this, 'EmailAlreadyRegistered', 'Email ' + newUser.email + ' is already registered').withDetails(newUser.email));
                        return;
                    }
                    if (data && data.id == userId)
                        oldUser = data;
                    callback();
                });
            },
            // Get the user
            function (callback) {
                if (oldUser) {
                    callback();
                    return;
                }
                _this._db.getUserById(correlationId, userId, function (err, data) {
                    oldUser = data;
                    if (oldUser == null && err == null) {
                        err = new pip_services_runtime_node_4.NotFoundError(_this, 'UserNotFound', 'User ' + userId + ' was not found').withDetails(userId);
                    }
                    callback(err);
                });
            },
            // Change name and other fields and save
            function (callback) {
                updatedUser = _.assign(oldUser, newUser);
                _this._db.updateUser(correlationId, userId, updatedUser, callback);
            },
            // Log activity
            function (callback) {
                _this.logActivity(correlationId, {
                    type: 'settings changed',
                    party: updatedUser
                });
                callback();
            }
        ], function (err) {
            callback(err, updatedUser);
        });
    };
    UsersController.prototype.deleteUser = function (correlationId, userId, callback) {
        this._db.deleteUser(correlationId, userId, callback);
    };
    /**
     * Unique descriptor for the UsersController component
     */
    UsersController.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Controllers, "pip-services-users", "*", "*");
    return UsersController;
}(pip_services_runtime_node_3.AbstractController));
exports.UsersController = UsersController;

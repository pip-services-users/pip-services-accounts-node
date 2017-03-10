"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var UsersCommandSet = (function (_super) {
    __extends(UsersCommandSet, _super);
    function UsersCommandSet(logic) {
        _super.call(this);
        this._logic = logic;
        // Register commands to the business logic
        this.addCommand(this.makeGetUsersCommand());
        this.addCommand(this.makeFindUserCommand());
        this.addCommand(this.makeGetUserByIdCommand());
        this.addCommand(this.makeCreateUserCommand());
        this.addCommand(this.makeRenameUserCommand());
        this.addCommand(this.makeUpdateUserCommand());
        this.addCommand(this.makeDeleteUserCommand());
    }
    UsersCommandSet.prototype.makeGetUsersCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_users", new pip_services_runtime_node_3.Schema()
            .withOptionalProperty("filter", "FilterParams")
            .withOptionalProperty("paging", "PagingParams"), function (correlationId, args, callback) {
            var filter = pip_services_runtime_node_4.FilterParams.fromValue(args.get("filter"));
            var paging = pip_services_runtime_node_5.PagingParams.fromValue(args.get("paging"));
            _this._logic.getUsers(correlationId, filter, paging, callback);
        });
    };
    UsersCommandSet.prototype.makeFindUserCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "find_user", new pip_services_runtime_node_3.Schema()
            .withOptionalProperty("user_id", "string")
            .withOptionalProperty("email", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var email = args.getNullableString("email");
            _this._logic.findUser(correlationId, userId, email, callback);
        });
    };
    UsersCommandSet.prototype.makeGetUserByIdCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_user_by_id", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            _this._logic.getUserById(correlationId, userId, callback);
        });
    };
    UsersCommandSet.prototype.makeCreateUserCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "create_user", new pip_services_runtime_node_3.Schema()
            .withProperty("user", "any"), function (correlationId, args, callback) {
            var user = args.get("user");
            _this._logic.createUser(correlationId, user, callback);
        });
    };
    UsersCommandSet.prototype.makeRenameUserCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "rename_user", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withOptionalProperty("new_email", "string")
            .withOptionalProperty("new_name", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var newEmail = args.get("new_email");
            var newName = args.get("new_name");
            _this._logic.renameUser(correlationId, userId, newEmail, newName, callback);
        });
    };
    UsersCommandSet.prototype.makeUpdateUserCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "update_user", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withProperty("user", "any"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var user = args.get("user");
            _this._logic.updateUser(correlationId, userId, user, callback);
        });
    };
    UsersCommandSet.prototype.makeDeleteUserCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "delete_user", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            _this._logic.deleteUser(correlationId, userId, callback);
        });
    };
    return UsersCommandSet;
}(pip_services_runtime_node_1.CommandSet));
exports.UsersCommandSet = UsersCommandSet;

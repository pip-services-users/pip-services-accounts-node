"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var UsersMicroservice_1 = require('./UsersMicroservice');
/**
 * Users process runner
 *
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-26
 */
var UsersProcessRunner = (function (_super) {
    __extends(UsersProcessRunner, _super);
    /**
     * Creates instance of users process runner
     */
    function UsersProcessRunner() {
        _super.call(this, new UsersMicroservice_1.UsersMicroservice());
    }
    return UsersProcessRunner;
}(pip_services_runtime_node_1.ProcessRunner));
exports.UsersProcessRunner = UsersProcessRunner;

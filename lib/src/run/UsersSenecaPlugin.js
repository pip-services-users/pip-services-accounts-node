"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var UsersMicroservice_1 = require('./UsersMicroservice');
var UsersSenecaPlugin = (function (_super) {
    __extends(UsersSenecaPlugin, _super);
    function UsersSenecaPlugin() {
        _super.call(this, 'users', new UsersMicroservice_1.UsersMicroservice());
    }
    return UsersSenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.UsersSenecaPlugin = UsersSenecaPlugin;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var UsersFactory_1 = require('../build/UsersFactory');
/**
 * Users microservice class.
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-26
 */
var UsersMicroservice = (function (_super) {
    __extends(UsersMicroservice, _super);
    /**
     * Creates instance of users microservice.
     */
    function UsersMicroservice() {
        _super.call(this, "pip-services-users", UsersFactory_1.UsersFactory.Instance);
    }
    return UsersMicroservice;
}(pip_services_runtime_node_1.Microservice));
exports.UsersMicroservice = UsersMicroservice;

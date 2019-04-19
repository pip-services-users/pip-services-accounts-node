"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const AccountsMongoDbPersistence_1 = require("../persistence/AccountsMongoDbPersistence");
const AccountsFilePersistence_1 = require("../persistence/AccountsFilePersistence");
const AccountsMemoryPersistence_1 = require("../persistence/AccountsMemoryPersistence");
const AccountsController_1 = require("../logic/AccountsController");
const AccountsHttpServiceV1_1 = require("../services/version1/AccountsHttpServiceV1");
const AccountsGrpcServiceV1_1 = require("../services/version1/AccountsGrpcServiceV1");
const AccountsCommandableGrpcServiceV1_1 = require("../services/version1/AccountsCommandableGrpcServiceV1");
class AccountsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(AccountsServiceFactory.MemoryPersistenceDescriptor, AccountsMemoryPersistence_1.AccountsMemoryPersistence);
        this.registerAsType(AccountsServiceFactory.FilePersistenceDescriptor, AccountsFilePersistence_1.AccountsFilePersistence);
        this.registerAsType(AccountsServiceFactory.MongoDbPersistenceDescriptor, AccountsMongoDbPersistence_1.AccountsMongoDbPersistence);
        this.registerAsType(AccountsServiceFactory.ControllerDescriptor, AccountsController_1.AccountsController);
        this.registerAsType(AccountsServiceFactory.HttpServiceDescriptor, AccountsHttpServiceV1_1.AccountsHttpServiceV1);
        this.registerAsType(AccountsServiceFactory.GrpcServiceDescriptor, AccountsGrpcServiceV1_1.AccountsGrpcServiceV1);
        this.registerAsType(AccountsServiceFactory.CommandableGrpcServiceDescriptor, AccountsCommandableGrpcServiceV1_1.AccountsCommandableGrpcServiceV1);
    }
}
AccountsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-accounts", "factory", "default", "default", "1.0");
AccountsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-accounts", "persistence", "memory", "*", "1.0");
AccountsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-accounts", "persistence", "file", "*", "1.0");
AccountsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-accounts", "persistence", "mongodb", "*", "1.0");
AccountsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-accounts", "controller", "default", "*", "1.0");
AccountsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-accounts", "service", "http", "*", "1.0");
AccountsServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-accounts", "service", "grpc", "*", "1.0");
AccountsServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-accounts", "service", "commandable-grpc", "*", "1.0");
exports.AccountsServiceFactory = AccountsServiceFactory;
//# sourceMappingURL=AccountsServiceFactory.js.map
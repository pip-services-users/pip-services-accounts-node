"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const AccountsMongoDbPersistence_1 = require("../persistence/AccountsMongoDbPersistence");
const AccountsFilePersistence_1 = require("../persistence/AccountsFilePersistence");
const AccountsMemoryPersistence_1 = require("../persistence/AccountsMemoryPersistence");
const AccountsController_1 = require("../logic/AccountsController");
const AccountsHttpServiceV1_1 = require("../services/version1/AccountsHttpServiceV1");
const AccountsSenecaServiceV1_1 = require("../services/version1/AccountsSenecaServiceV1");
class AccountsServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(AccountsServiceFactory.MemoryPersistenceDescriptor, AccountsMemoryPersistence_1.AccountsMemoryPersistence);
        this.registerAsType(AccountsServiceFactory.FilePersistenceDescriptor, AccountsFilePersistence_1.AccountsFilePersistence);
        this.registerAsType(AccountsServiceFactory.MongoDbPersistenceDescriptor, AccountsMongoDbPersistence_1.AccountsMongoDbPersistence);
        this.registerAsType(AccountsServiceFactory.ControllerDescriptor, AccountsController_1.AccountsController);
        this.registerAsType(AccountsServiceFactory.SenecaServiceDescriptor, AccountsSenecaServiceV1_1.AccountsSenecaServiceV1);
        this.registerAsType(AccountsServiceFactory.HttpServiceDescriptor, AccountsHttpServiceV1_1.AccountsHttpServiceV1);
    }
}
AccountsServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-Accounts", "factory", "default", "default", "1.0");
AccountsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "persistence", "memory", "*", "1.0");
AccountsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "persistence", "file", "*", "1.0");
AccountsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "persistence", "mongodb", "*", "1.0");
AccountsServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "controller", "default", "*", "1.0");
AccountsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "service", "seneca", "*", "1.0");
AccountsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "service", "http", "*", "1.0");
exports.AccountsServiceFactory = AccountsServiceFactory;
//# sourceMappingURL=AccountsServiceFactory.js.map
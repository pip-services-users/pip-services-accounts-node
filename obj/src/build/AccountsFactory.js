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
class AccountsFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(AccountsFactory.MemoryPersistenceDescriptor, AccountsMemoryPersistence_1.AccountsMemoryPersistence);
        this.registerAsType(AccountsFactory.FilePersistenceDescriptor, AccountsFilePersistence_1.AccountsFilePersistence);
        this.registerAsType(AccountsFactory.MongoDbPersistenceDescriptor, AccountsMongoDbPersistence_1.AccountsMongoDbPersistence);
        this.registerAsType(AccountsFactory.ControllerDescriptor, AccountsController_1.AccountsController);
        this.registerAsType(AccountsFactory.SenecaServiceDescriptor, AccountsSenecaServiceV1_1.AccountsSenecaServiceV1);
        this.registerAsType(AccountsFactory.HttpServiceDescriptor, AccountsHttpServiceV1_1.AccountsHttpServiceV1);
    }
}
AccountsFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-Accounts", "factory", "default", "default", "1.0");
AccountsFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "persistence", "memory", "*", "1.0");
AccountsFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "persistence", "file", "*", "1.0");
AccountsFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "persistence", "mongodb", "*", "1.0");
AccountsFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "controller", "default", "*", "1.0");
AccountsFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "service", "seneca", "*", "1.0");
AccountsFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-accounts", "service", "http", "*", "1.0");
exports.AccountsFactory = AccountsFactory;
//# sourceMappingURL=AccountsFactory.js.map
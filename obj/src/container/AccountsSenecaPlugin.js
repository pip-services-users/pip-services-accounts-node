"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const AccountsMemoryPersistence_1 = require("../persistence/AccountsMemoryPersistence");
const AccountsFilePersistence_1 = require("../persistence/AccountsFilePersistence");
const AccountsMongoDbPersistence_1 = require("../persistence/AccountsMongoDbPersistence");
const AccountsController_1 = require("../logic/AccountsController");
const AccountsSenecaServiceV1_1 = require("../services/version1/AccountsSenecaServiceV1");
const pip_clients_activities_node_1 = require("pip-clients-activities-node");
class AccountsSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-accounts', seneca, AccountsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let activitiesClient = new pip_clients_activities_node_1.ActivitiesSenecaClientV1();
        let activitiesOptions = options.activities || {};
        activitiesClient.configure(pip_services_commons_node_3.ConfigParams.fromValue(activitiesOptions));
        let controller = new AccountsController_1.AccountsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new AccountsMongoDbPersistence_1.AccountsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new AccountsFilePersistence_1.AccountsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new AccountsMemoryPersistence_1.AccountsMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let service = new AccountsSenecaServiceV1_1.AccountsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-activities', 'client', 'seneca', 'default', '1.0'), activitiesClient, new pip_services_commons_node_2.Descriptor('pip-services-accounts', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-accounts', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-accounts', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.AccountsSenecaPlugin = AccountsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new AccountsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=AccountsSenecaPlugin.js.map
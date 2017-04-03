import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';
import { SenecaInstance } from 'pip-services-net-node';

import { AccountsMemoryPersistence } from '../persistence/AccountsMemoryPersistence';
import { AccountsFilePersistence } from '../persistence/AccountsFilePersistence';
import { AccountsMongoDbPersistence } from '../persistence/AccountsMongoDbPersistence';
import { AccountsController } from '../logic/AccountsController';
import { AccountsSenecaServiceV1 } from '../services/version1/AccountsSenecaServiceV1';
import { ActivitiesSenecaClientV1 } from 'pip-clients-activities-node';

export class AccountsSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-accounts', seneca, AccountsSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let activitiesClient = new ActivitiesSenecaClientV1();
        let activitiesOptions = options.activities || {};
        activitiesClient.configure(ConfigParams.fromValue(activitiesOptions));

        let controller = new AccountsController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new AccountsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new AccountsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new AccountsMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let service = new AccountsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-activities', 'client', 'seneca', 'default', '1.0'), activitiesClient,
            new Descriptor('pip-services-accounts', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-accounts', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-accounts', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new AccountsSenecaPlugin(seneca, options);
    return { name: plugin.name };
}
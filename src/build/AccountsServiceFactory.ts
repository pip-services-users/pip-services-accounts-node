import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { AccountsMongoDbPersistence } from '../persistence/AccountsMongoDbPersistence';
import { AccountsFilePersistence } from '../persistence/AccountsFilePersistence';
import { AccountsMemoryPersistence } from '../persistence/AccountsMemoryPersistence';
import { AccountsController } from '../logic/AccountsController';
import { AccountsHttpServiceV1 } from '../services/version1/AccountsHttpServiceV1';
import { AccountsSenecaServiceV1 } from '../services/version1/AccountsSenecaServiceV1'; 

export class AccountsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-Accounts", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-accounts", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-accounts", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-accounts", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-accounts", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-accounts", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-accounts", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(AccountsServiceFactory.MemoryPersistenceDescriptor, AccountsMemoryPersistence);
		this.registerAsType(AccountsServiceFactory.FilePersistenceDescriptor, AccountsFilePersistence);
		this.registerAsType(AccountsServiceFactory.MongoDbPersistenceDescriptor, AccountsMongoDbPersistence);
		this.registerAsType(AccountsServiceFactory.ControllerDescriptor, AccountsController);
		this.registerAsType(AccountsServiceFactory.SenecaServiceDescriptor, AccountsSenecaServiceV1);
		this.registerAsType(AccountsServiceFactory.HttpServiceDescriptor, AccountsHttpServiceV1);
	}
	
}

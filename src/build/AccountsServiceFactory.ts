import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { AccountsCouchbasePersistence } from '../persistence/AccountsCouchbasePersistence';
import { AccountsMongoDbPersistence } from '../persistence/AccountsMongoDbPersistence';
import { AccountsFilePersistence } from '../persistence/AccountsFilePersistence';
import { AccountsMemoryPersistence } from '../persistence/AccountsMemoryPersistence';
import { AccountsController } from '../logic/AccountsController';
import { AccountsHttpServiceV1 } from '../services/version1/AccountsHttpServiceV1';
import { AccountsGrpcServiceV1 } from '../services/version1/AccountsGrpcServiceV1';
import { AccountsCommandableGrpcServiceV1 } from '../services/version1/AccountsCommandableGrpcServiceV1';

export class AccountsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-accounts", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-accounts", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-accounts", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-accounts", "persistence", "mongodb", "*", "1.0");
	public static CouchbasePersistenceDescriptor = new Descriptor("pip-services-accounts", "persistence", "couchbase", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-accounts", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-accounts", "service", "http", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("pip-services-accounts", "service", "grpc", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("pip-services-accounts", "service", "commandable-grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(AccountsServiceFactory.MemoryPersistenceDescriptor, AccountsMemoryPersistence);
		this.registerAsType(AccountsServiceFactory.FilePersistenceDescriptor, AccountsFilePersistence);
		this.registerAsType(AccountsServiceFactory.MongoDbPersistenceDescriptor, AccountsMongoDbPersistence);
		this.registerAsType(AccountsServiceFactory.CouchbasePersistenceDescriptor, AccountsCouchbasePersistence);
		this.registerAsType(AccountsServiceFactory.ControllerDescriptor, AccountsController);
		this.registerAsType(AccountsServiceFactory.HttpServiceDescriptor, AccountsHttpServiceV1);
		this.registerAsType(AccountsServiceFactory.GrpcServiceDescriptor, AccountsGrpcServiceV1);
		this.registerAsType(AccountsServiceFactory.CommandableGrpcServiceDescriptor, AccountsCommandableGrpcServiceV1);
	}
	
}

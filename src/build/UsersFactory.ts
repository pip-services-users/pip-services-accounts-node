import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';
import { ActivitiesFactory } from 'pip-clients-activities-node';

import { UsersMongoDbPersistence } from '../persistence/UsersMongoDbPersistence';
import { UsersFilePersistence } from '../persistence/UsersFilePersistence';
import { UsersMemoryPersistence } from '../persistence/UsersMemoryPersistence';
import { UsersController } from '../logic/UsersController';
import { UsersRestService } from '../services/version1/UsersRestService';
import { UsersSenecaService } from '../services/version1/UsersSenecaService'; 

export class UsersFactory extends ComponentFactory {
	public static Instance: UsersFactory = new UsersFactory();
	
	constructor() {
		super(DefaultFactory.Instance, ActivitiesFactory.Instance);

		this.register(UsersFilePersistence.Descriptor, UsersFilePersistence);
		this.register(UsersMemoryPersistence.Descriptor, UsersMemoryPersistence);
		this.register(UsersMongoDbPersistence.Descriptor, UsersMongoDbPersistence);
		this.register(UsersController.Descriptor, UsersController);
		this.register(UsersRestService.Descriptor, UsersRestService);
		this.register(UsersSenecaService.Descriptor, UsersSenecaService);
	}
	
}

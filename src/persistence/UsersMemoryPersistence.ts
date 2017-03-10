let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { UsersFilePersistence } from './UsersFilePersistence';
import { IUsersPersistence } from './IUsersPersistence';

export class UsersMemoryPersistence extends UsersFilePersistence implements IUsersPersistence {
	/**
	 * Unique descriptor for the UsersMemoryPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-users", "memory", "*"
	);

    constructor() {
        super(UsersMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }
}

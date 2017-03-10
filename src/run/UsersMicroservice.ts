import { Microservice } from 'pip-services-runtime-node';

import { UsersFactory } from '../build/UsersFactory';

/**
 * Users microservice class.
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-26
 */
export class UsersMicroservice extends Microservice {
	/**
	 * Creates instance of users microservice.
	 */
	constructor() {
		super("pip-services-users", UsersFactory.Instance);
	}
}

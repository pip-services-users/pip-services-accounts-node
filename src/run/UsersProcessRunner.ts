import { ProcessRunner } from 'pip-services-runtime-node';

import { UsersMicroservice } from './UsersMicroservice';

/**
 * Users process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-26
 */
export class UsersProcessRunner extends ProcessRunner {
    /**
     * Creates instance of users process runner
     */
    constructor() {
        super(new UsersMicroservice());
    }
}
import { SenecaPlugin } from 'pip-services-runtime-node';

import { UsersMicroservice} from './UsersMicroservice';

export class UsersSenecaPlugin extends SenecaPlugin {
    constructor() {
        super('users', new UsersMicroservice());
    }
}
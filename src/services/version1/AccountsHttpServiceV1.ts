import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class AccountsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('accounts');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-accounts', 'controller', 'default', '*', '1.0'));
    }
}
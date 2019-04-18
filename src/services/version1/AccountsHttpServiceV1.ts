import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class AccountsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/accounts');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-accounts', 'controller', 'default', '*', '1.0'));
    }
}
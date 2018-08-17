import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-seneca-node';

export class AccountsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('accounts');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-accounts', 'controller', 'default', '*', '1.0'));
    }
}
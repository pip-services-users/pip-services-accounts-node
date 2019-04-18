import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class AccountsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/accounts');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-accounts', 'controller', 'default', '*', '*'));
    }
}
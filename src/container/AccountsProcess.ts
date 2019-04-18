import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { AccountsServiceFactory } from '../build/AccountsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';
import { DefaultGrpcFactory } from 'pip-services3-grpc-node';

export class AccountsProcess extends ProcessContainer {

    public constructor() {
        super("accounts", "User accounts microservice");
        this._factories.add(new AccountsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
    }

}
